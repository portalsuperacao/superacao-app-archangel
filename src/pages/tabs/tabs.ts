import { Component } from '@angular/core';

import { ArchangelChatPage } from '../archangel/chat/chat';
import { ArchangelMissionsPage } from '../archangel/missions/missions';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  chat: any = ArchangelChatPage;
  missions: any = ArchangelMissionsPage;

  constructor() {}
}
