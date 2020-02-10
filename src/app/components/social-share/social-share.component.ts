import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { iconpack } from 'src/icons';
import { ShareService } from '@ngx-share/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent {

  constructor(library: FaIconLibrary, public share: ShareService) {
    library.addIcons(...iconpack);
  }
}
