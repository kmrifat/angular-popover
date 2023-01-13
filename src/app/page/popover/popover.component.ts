import {Component, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  showPopover: boolean = false
  showPopoverTwo: boolean = false
  color = 'yellow';


  openPopover(seeMe: TemplateRef<any>) {
    console.log(seeMe)
  }
}
