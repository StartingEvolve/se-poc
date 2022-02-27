export default class BotpressConfig {
  constructor() {
    this.init();
    this.client = window.botpressWebChat;
  }

  init() {
    this.config = {
      host: 'https://chatbot.startingevolve.tech',
      botId: 'starting-evolve-chatbot',
      hideWidget: true,
      enableReset: false,
      enableTranscriptDownload: false,
      showConversationsButton: false,
      extraStylesheet: '/assets/modules/channel-web/se-theme.css'
    };
    //Init bot instance
    window.botpressWebChat.init(this.config);
  }

  changeLanguage(locale) {
    this.config.locale = locale;
    window.botpressWebChat.configure(this.config);
  }

  getConfig() {
    return { client: this.client, webchatOpen: window.webchatOpen };
  }

  destroy() {
    this.client.destroy();
  }

  rebuild() {
    return this.client.rebuild();
  }
}
