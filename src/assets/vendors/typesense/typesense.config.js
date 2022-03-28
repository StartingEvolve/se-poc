export default class TypesenseConfig {
  constructor() {
    this.client = this.init();
  }

  init() {
    return new window.Typesense.Client({
      nodes: [
        {
          host: 'search.startingevolve.tech', // where xxx is the ClusterID of your Typesense Cloud cluster
          port: '443',
          protocol: 'https'
        }
      ],
      apiKey: '8SCbUB6OwcorefYh114fsK1PtTn9OO50',
      connectionTimeoutSeconds: 10,
      retryIntervalSeconds: 0.1,
      healthcheckIntervalSeconds: 2
    });
  }
  getClient() {
    return this.client;
  }

  destroy() {
    this.client.destroy();
  }

  rebuild() {
    return this.client.rebuild();
  }
}
