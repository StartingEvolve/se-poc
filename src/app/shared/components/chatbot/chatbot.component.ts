import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VendorService } from '@core/services/vendor.service';
import { Config, OnVendorChangeConfig } from '@core/store/vendor/vendor.store';
import BotpressConfig from '@vendors/botpress/botpress.config';
import { Subscription } from 'rxjs';

@Component({
  selector: 'se-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent
  implements OnInit, AfterViewInit, OnVendorChangeConfig
{
  private readonly libraries: string[];
  configurations: Config;
  private storeSub: Subscription;

  constructor(private venService: VendorService) {
    this.libraries = ['botpress'];
    this.venService.getConfigObjects(this.libraries).then((config) => {
      this.configurations = config;
    });
  }

  seOnVendorChangeConfig() {
    const configMap = new Map();
    configMap.set('botpress', [new BotpressConfig()]);
    return configMap;
  }

  ngOnInit(): void {
    this.venService.use(this.libraries);
  }

  ngAfterViewInit() {
    this.storeSub = this.venService.watchVendorChanges(
      this,
      this.libraries,
      this.seOnVendorChangeConfig
    );
  }
}
