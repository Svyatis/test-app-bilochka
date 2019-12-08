import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-loading-wheel',
  templateUrl: './loading-wheel.component.html',
  styleUrls: ['./loading-wheel.component.scss']
})
export class LoadingWheelComponent implements OnInit, OnDestroy {
  public show = true;
  private subscription: Subscription;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
    this.subscription = this.utilsService.loaderState
      .subscribe((state: boolean) => {
          this.show = state;
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
