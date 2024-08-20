import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { StarBackgroundProps, StarProps } from "./ngx-starry-sky.types";

@Component({
  selector: "om-starry-sky",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-starry-sky.component.html",
  styleUrl: "./ngx-starry-sky.component.scss",
})
export class NgxStarrySkyComponent implements AfterViewInit {
  @ViewChild("OmStarrySkyCanvas")
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild("OmStarrySkyWrapper")
  wrapperRef!: ElementRef<HTMLElement>;

  @Input("styleClass")
  styleClass?: string;

  @Input("skyColor")
  set skyColor(color: string) {
    this.style["--om-starry-sky-color"] = color;
  }

  @Input("starsBackground")
  set starsBackgroundValue(props: StarBackgroundProps) {
    this.starsBackground = { ...this.starsBackground, ...props };
  }

  private starsBackground: StarBackgroundProps = {
    starDensity: 0.00015,
    allStarsTwinkle: true,
    twinkleProbability: 0.7,
    minTwinkleSpeed: 0.5,
    maxTwinkleSpeed: 1,
  };

  style: any = {};

  private stars: StarProps[] = [];

  ngAfterViewInit(): void {
    this.setCanvasSize();
    this.initStarSky();
  }

  private initStarSky(): void {
    this.updateStars();
    this.renderStarSky();
  }

  private renderStarSky(): void {
    const context = this.canvasRef.nativeElement.getContext("2d");

    if (!context) {
      return;
    }

    context.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );

    this.stars.forEach((star) => {
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      context.fill();

      if (star.twinkleSpeed !== null) {
        star.opacity =
          0.5 +
          Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
      }
    });

    window.requestAnimationFrame(() => this.renderStarSky());
  }

  private updateStars(): void {
    const context = this.canvasRef.nativeElement.getContext("2d");

    if (!context) {
      return;
    }

    const { width, height } =
      this.wrapperRef.nativeElement.getBoundingClientRect();

    this.stars = this.generateStars(width, height);
  }

  private generateStars(width: number, height: number): StarProps[] {
    const area = width * height;
    const numStars = Math.floor(
      area * (this.starsBackground.starDensity ?? 0.00015)
    );
    return Array.from({ length: numStars }, () => {
      const shouldTwinkle =
        this.starsBackground.allStarsTwinkle ||
        Math.random() < (this.starsBackground.twinkleProbability ?? 0.7);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.05 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle
          ? (this.starsBackground.minTwinkleSpeed ?? 0.5) +
            Math.random() *
              ((this.starsBackground.maxTwinkleSpeed ?? 1) -
                (this.starsBackground.minTwinkleSpeed ?? 0.5))
          : null,
      };
    });
  }

  private setCanvasSize(): void {
    this.canvasRef.nativeElement.width =
      this.wrapperRef.nativeElement.getBoundingClientRect().width;
    this.canvasRef.nativeElement.height =
      this.wrapperRef.nativeElement.getBoundingClientRect().height;
  }
}
