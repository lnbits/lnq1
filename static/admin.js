const client = window.createLNbitsExtensionClient({extensionId: 'lnq1'})
const MIN_JOIN_SATS = 50

const app = Vue.createApp({
  data() {
    return {
      loading: false,
      saving: false,
      creating: false,
      authorizingPayouts: false,
      deletingGameId: '',
      deleteDialog: {show: false, game: null},
      settings: {enabled: false, haircut: 0, walletId: ''},
      gameForm: {name: 'LNQ1 public arena', joinAmount: 100},
      wallets: [],
      games: [],
      pagination: {sortBy: 'createdAt', descending: true, page: 1, rowsPerPage: 10, rowsNumber: 0},
      columns: [
        {name: 'name', label: 'Arena', field: 'name', align: 'left', sortable: true},
        {name: 'joinAmount', label: 'Join sats', field: 'joinAmount', align: 'right', sortable: true},
        {name: 'haircut', label: 'Haircut', field: 'haircut', align: 'right', sortable: true},
        {name: 'players', label: 'Alive', field: 'playersCount', align: 'left', sortable: false},
        {name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true},
        {name: 'actions', label: '', field: 'id', align: 'right', sortable: false}
      ]
    }
  },
  computed: {
    selectedWalletName() {
      return this.wallets.find(wallet => wallet.id === this.effectiveWalletId)?.name || ''
    },
    effectiveWalletId() {
      return this.settings.walletId || this.wallets[0]?.id || ''
    },
    canSave() {
      return !this.settings.enabled || !!this.effectiveWalletId
    },
    canCreate() {
      return this.settings.enabled && this.effectiveWalletId && this.gameForm.name && Number.isSafeInteger(Number(this.gameForm.joinAmount)) && Number(this.gameForm.joinAmount) >= MIN_JOIN_SATS
    },
    canAuthorizePayouts() {
      return this.settings.enabled && this.effectiveWalletId && Number.isSafeInteger(Number(this.gameForm.joinAmount)) && Number(this.gameForm.joinAmount) >= MIN_JOIN_SATS
    }
  },
  async mounted() {
    this.loading = true
    try {
      await Promise.all([this.fetchWallets(), this.fetchSettings(), this.fetchGames()])
    } finally {
      this.loading = false
    }
  },
  methods: {
    async fetchWallets() {
      try { this.wallets = (await client.listWallets()).wallets || [] } catch (error) { this.showError(error) }
    },
    async fetchSettings() {
      try {
        this.settings = {...this.settings, ...((await client.getSettings()).settings || {})}
        if (!this.settings.walletId && this.wallets.length) this.settings.walletId = this.wallets[0].id
      } catch (error) { this.showError(error) }
    },
    async saveSettings() {
      if (!this.canSave) return
      this.saving = true
      try {
        this.settings = (await client.saveSettings({
          enabled: this.settings.enabled,
          walletId: this.effectiveWalletId,
          walletName: this.selectedWalletName,
          haircut: Number(this.settings.haircut || 0)
        })).settings
        this.notify('LNQ1 settings saved.', 'positive')
      } catch (error) { this.showError(error) } finally { this.saving = false }
    },
    async createGame() {
      if (!this.canCreate) return
      this.creating = true
      try {
        await this.ensurePayoutPermission()
        await client.createGame({name: this.gameForm.name, joinAmount: Number(this.gameForm.joinAmount)})
        this.notify('Arena created.', 'positive')
        await this.fetchGames()
      } catch (error) { this.showError(error) } finally { this.creating = false }
    },
    payoutPermissionGrant() {
      return {
        walletId: this.effectiveWalletId,
        maxAmount: Math.max(1, Number(this.gameForm.joinAmount || 1)),
        destinationPolicy: 'external_allowed'
      }
    },
    async ensurePayoutPermission(options = {}) {
      return await client.requestBackgroundPaymentPermission(
        this.payoutPermissionGrant(),
        options
      )
    },
    async authorizePayouts() {
      if (!this.canAuthorizePayouts) return
      this.authorizingPayouts = true
      try {
        await this.ensurePayoutPermission({forcePrompt: true})
        this.notify('Payout permission saved.', 'positive')
      } catch (error) { this.showError(error) } finally { this.authorizingPayouts = false }
    },
    async fetchGames(props = {}) {
      const pagination = props.pagination || this.pagination
      try {
        const response = await client.listGames({
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
          sortBy: pagination.sortBy,
          descending: pagination.descending
        })
        this.games = response.games || []
        this.pagination = {...pagination, rowsNumber: response.total || 0}
      } catch (error) { this.showError(error) }
    },
    publicUrl(game) {
      return new URL('/ext/lnq1/games/' + encodeURIComponent(game.id), window.location.href).href
    },
    async copyGame(game) {
      await navigator.clipboard?.writeText(this.publicUrl(game))
      this.notify('Arena link copied.', 'positive')
    },
    requestDeleteGame(game) {
      this.deleteDialog = {show: true, game}
    },
    async deleteGame(game) {
      this.deletingGameId = game.id
      try {
        await client.deleteGame(game.id)
        this.deleteDialog = {show: false, game: null}
        await this.fetchGames()
      } catch (error) { this.showError(error) } finally { this.deletingGameId = '' }
    },
    notify(message, type = 'info') {
      client.notify(message, type).catch(() => Quasar.Notify.create({type, message}))
    },
    showError(error) {
      this.notify(error?.message || String(error), 'negative')
    }
  },
  render() {
    const h = Vue.h
    const q = name => Quasar[name]
    return h('main', {class: 'admin-shell q-pa-md'}, [
      h(q('QDialog'), {modelValue: this.deleteDialog.show, 'onUpdate:modelValue': v => this.deleteDialog.show = v}, () => [
        h(q('QCard'), {dark: true, style: 'width: min(420px, calc(100vw - 32px))'}, () => [
          h(q('QCardSection'), () => [
            h('h2', {class: 'text-h6 text-weight-bold q-my-none'}, 'Delete Arena')
          ]),
          h(q('QCardSection'), {class: 'q-pt-none'}, () => 'Delete "' + (this.deleteDialog.game?.name || 'this arena') + '"?'),
          h(q('QCardActions'), {align: 'right'}, () => [
            h(q('QBtn'), {flat: true, color: 'primary', label: 'Cancel', onClick: () => this.deleteDialog = {show: false, game: null}}),
            h(q('QBtn'), {unelevated: true, color: 'negative', label: 'Delete', loading: this.deletingGameId === this.deleteDialog.game?.id, onClick: () => this.deleteGame(this.deleteDialog.game)})
          ])
        ])
      ]),
      h('header', {class: 'row items-center q-gutter-md q-mb-md'}, [
        h('div', {class: 'streetfighter-mark'}, 'LN'),
        h('div', [
          h('h1', {class: 'text-h4 text-weight-bold q-my-none'}, 'LNQ1 Arena'),
          h('p', {class: 'text-subtitle2 text-grey-5 q-my-none'}, 'Paid deathmatch rooms, five players at a time.')
        ])
      ]),
      h('div', {class: 'row q-col-gutter-md'}, [
        h('div', {class: 'col-12 col-md-5 q-gutter-y-md'}, [
          h(q('QCard'), {dark: true}, () => h(q('QCardSection'), () => [
            h('h2', {class: 'text-h6 text-weight-bold q-my-none q-mb-md'}, 'Settings'),
            h(q('QToggle'), {modelValue: this.settings.enabled, 'onUpdate:modelValue': v => this.settings.enabled = v, label: 'Enable paid arenas', color: 'primary'}),
            h(q('QSelect'), {class: 'q-mt-md', modelValue: this.effectiveWalletId, 'onUpdate:modelValue': v => this.settings.walletId = v, options: this.wallets.map(w => ({label: w.name, value: w.id})), label: 'Wallet', filled: true, dense: true, dark: true, optionsDark: true, emitValue: true, mapOptions: true}),
          h(q('QInput'), {class: 'q-mt-sm', modelValue: this.settings.haircut, 'onUpdate:modelValue': v => this.settings.haircut = v, type: 'number', label: 'Haircut percent', filled: true, dense: true, dark: true, min: 0, max: 100}),
            h(q('QBtn'), {class: 'q-mt-md', color: 'primary', loading: this.saving, disable: !this.canSave, onClick: this.saveSettings}, () => 'Save Settings')
          ])),
          h(q('QCard'), {dark: true}, () => h(q('QCardSection'), () => [
            h('h2', {class: 'text-h6 text-weight-bold q-my-none q-mb-md'}, 'New Arena'),
            h(q('QInput'), {modelValue: this.gameForm.name, 'onUpdate:modelValue': v => this.gameForm.name = v, label: 'Title', filled: true, dense: true, dark: true}),
            h(q('QInput'), {class: 'q-mt-sm', modelValue: this.gameForm.joinAmount, 'onUpdate:modelValue': v => this.gameForm.joinAmount = v, type: 'number', label: 'Join sats (minimum 50)', filled: true, dense: true, dark: true, min: MIN_JOIN_SATS}),
            h(q('QBtn'), {class: 'q-mt-md', color: 'primary', loading: this.creating, disable: !this.canCreate, onClick: this.createGame}, () => 'Create Arena')
          ]))
        ]),
        h('div', {class: 'col-12 col-md-7'}, [
          h(q('QCard'), {dark: true}, () => h(q('QCardSection'), () => [
            h('div', {class: 'row items-center justify-between q-mb-md'}, [
              h('h2', {class: 'text-h6 text-weight-bold q-my-none'}, 'Arenas'),
              h(q('QBtn'), {color: 'primary', outline: true, loading: this.authorizingPayouts, disable: !this.canAuthorizePayouts, onClick: this.authorizePayouts}, () => 'Authorize Payouts')
            ]),
            h(q('QTable'), {dark: true, flat: true, rows: this.games, columns: this.columns, rowKey: 'id', pagination: this.pagination, loading: this.loading, onRequest: this.fetchGames}, {
              'body-cell-players': props => h(q('QTd'), {props}, () => props.row.playersCount + ' / 5'),
              'body-cell-haircut': props => h(q('QTd'), {props}, () => props.row.haircut + '%'),
              'body-cell-actions': props => h(q('QTd'), {props, class: 'q-gutter-xs'}, () => [
                h(q('QBtn'), {flat: true, round: true, dense: true, icon: 'content_copy', onClick: () => this.copyGame(props.row)}),
                h(q('QBtn'), {flat: true, round: true, dense: true, color: 'negative', icon: 'delete', loading: this.deletingGameId === props.row.id, onClick: () => this.requestDeleteGame(props.row)})
              ])
            })
          ]))
        ])
      ])
    ])
  }
})
app.use(Quasar)
app.mount('#lnq1-admin-app')
