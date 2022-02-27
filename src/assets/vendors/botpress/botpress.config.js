export default class BotpressConfig {
  constructor() {
    this.init();
    this.client = window.botpressWebChat;
  }

  init() {
    //Init bot instance
    window.botpressWebChat.init({
      host: 'http://localhost:3000',
      botId: 'starting-evolve-chatbot',
      hideWidget: true,
      enableReset: false,
      enableTranscriptDownload: false,
      showConversationsButton: false,
      locale: 'fr',
      extraStylesheet: '/assets/modules/channel-web/se-theme.css'
    });
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
