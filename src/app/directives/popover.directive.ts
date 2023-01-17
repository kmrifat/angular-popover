import {
  Directive,
  ElementRef,
  HostListener, Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";

@Directive({
  selector: '[popoverTrigger]'
})
export class PopoverDirective implements OnDestroy, OnInit {
  @Input()
  popoverTrigger!: TemplateRef<object>;

  private unsubscribe = new Subject();
  private overlayRef!: OverlayRef;

  constructor(private elementRef: ElementRef,
              private overlay: Overlay,
              private vcr: ViewContainerRef,
              private injector: Injector
  ) {
  }

  @HostListener("click") clickou() {
    this.attachOverlay();
  }

  ngOnInit(): void {
    this.createOverlay();
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }


  private createOverlay() {
    const arrowSize = 20;
    const arrowOffset = 5;
    const panelOffset = arrowSize / 2;

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const positionStrategy = this.overlay.position().flexibleConnectedTo(this.elementRef).withPositions([
      // bottom center
      {
        overlayX: 'center',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['bottom', 'center'],
        offsetY: panelOffset,
      },
      // bottom left
      {
        overlayX: 'start',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['bottom', 'left'],
        offsetX: -1 * arrowOffset,
        offsetY: panelOffset,
      },
      // bottom right
      {
        overlayX: 'end',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['bottom', 'right'],
        offsetX: arrowOffset,
        offsetY: panelOffset,
      },
      // top center
      {
        overlayX: 'center',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['top', 'center'],
        offsetY: -1 * panelOffset,
      },
      // top left
      {
        overlayX: 'start',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['top', 'left'],
        offsetX: -1 * arrowOffset,
        offsetY: -1 * panelOffset,
      },
      // top right
      {
        overlayX: 'end',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['top', 'right'],
        offsetX: arrowOffset,
        offsetY: -1 * panelOffset,
      },
    ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: ""
    });

    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.detachOverlay();
      });
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(
        this.popoverTrigger,
        this.vcr
      );

      this.overlayRef.attach(periodSelectorPortal);

    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
