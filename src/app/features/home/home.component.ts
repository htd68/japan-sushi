import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

export interface MenuItem {
  emoji: string;
  name: string;
  description: string;
  price: string;
  bgClass: string;
}

export interface MenuCard {
  emoji: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  cartStates: boolean[] = [false, false, false, false];

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initScrollAnimation();
    this.initScrollReveal();
    this.initStaggerDelay();
  }

  addToCart(index: number): void {
    this.cartStates[index] = true;
    setTimeout(() => {
      this.cartStates[index] = false;
    }, 1500);
  }
  private initScrollAnimation(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }
  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              this.renderer.addClass(entry.target, 'visible');
            }, i * 80);
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeEls = this.el.nativeElement.querySelectorAll('.fade-in');
    fadeEls.forEach((el: Element) => observer.observe(el));
  }

  // ── Phần 2: Stagger transition-delay cho các grid ──
  private initStaggerDelay(): void {
    const selectors = '.cards-grid, .gallery-grid, .features-row';
    const grids = this.el.nativeElement.querySelectorAll(selectors);

    grids.forEach((grid: Element) => {
      Array.from(grid.children).forEach((child, i) => {
        this.renderer.setStyle(child, 'transition-delay', `${i * 0.12}s`);
      });
    });
  }
}