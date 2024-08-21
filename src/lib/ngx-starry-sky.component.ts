import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import {
  ShootingStar,
  ShootingStarsProps,
  StarBackgroundProps,
  StarProps,
} from "./ngx-starry-sky.types";

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

  @ViewChild("OmStarrySkySvg")
  svgRef!: ElementRef<HTMLOrSVGElement>;

  @ViewChild("OmStarrySkyWrapper")
  wrapperRef!: ElementRef<HTMLElement>;

  @Input("styleClass")
  styleClass?: string;

  @Input("disableShootingStars")
  disableShootingStars = false;

  @Input("skyColor")
  set skyColor(color: string) {
    this.style["--om-starry-sky-color"] = color;
  }

  @Input("starsBackgroundConfig")
  set starsBackgroundPropsValue(props: StarBackgroundProps) {
    this.starsBackgroundProps = { ...this.starsBackgroundProps, ...props };
  }

  private starsBackgroundProps: StarBackgroundProps = {
    starDensity: 0.00015,
    allStarsTwinkle: true,
    twinkleProbability: 0.7,
    minTwinkleSpeed: 0.5,
    maxTwinkleSpeed: 1,
  };

  @Input("shootingStarsConfig")
  set shootingStarsPropsValue(props: ShootingStarsProps) {
    this.shootingStarsProps = { ...this.shootingStarsProps, ...props };
  }

  shootingStarsProps: ShootingStarsProps = {
    minSpeed: 10,
    maxSpeed: 30,
    minDelay: 1200,
    maxDelay: 4200,
    starColor: "#9E00FF",
    trailColor: "#2EB9DF",
    starWidth: 10,
    starHeight: 1,
  };

  shootingStar?: ShootingStar;

  style: any = {};

  private stars: StarProps[] = [];

  ngAfterViewInit(): void {
    this.initStarSky();
    this.initShootingStars();
  }

  private initStarSky(): void {
    this.setCanvasSize();
    this.updateStars();
    this.renderStarSky();
  }

  private initShootingStars(): void {
    if (this.disableShootingStars) {
      return;
    }

    this.createShootingStar();
    this.moveShootingStar();
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
      area * (this.starsBackgroundProps.starDensity ?? 0.00015)
    );
    return Array.from({ length: numStars }, () => {
      const shouldTwinkle =
        this.starsBackgroundProps.allStarsTwinkle ||
        Math.random() < (this.starsBackgroundProps.twinkleProbability ?? 0.7);

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.05 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: shouldTwinkle
          ? (this.starsBackgroundProps.minTwinkleSpeed ?? 0.5) +
            Math.random() *
              ((this.starsBackgroundProps.maxTwinkleSpeed ?? 1) -
                (this.starsBackgroundProps.minTwinkleSpeed ?? 0.5))
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

  private createShootingStar(): void {
    const { x, y, angle } = this.getRandomStartPoint();

    const newStar: ShootingStar = {
      id: Date.now(),
      x,
      y,
      angle,
      scale: 1,
      speed:
        Math.random() *
          ((this.shootingStarsProps.maxSpeed ?? 30) -
            (this.shootingStarsProps.minSpeed ?? 10)) +
        (this.shootingStarsProps.minSpeed ?? 10),
      distance: 0,
    };

    this.shootingStar = newStar;

    const randomDelay =
      Math.random() *
        ((this.shootingStarsProps.maxDelay ?? 4200) -
          (this.shootingStarsProps.minDelay ?? 1200)) +
      (this.shootingStarsProps.minDelay ?? 1200);

    setTimeout(() => this.createShootingStar(), randomDelay);
  }

  private moveShootingStar(): void {
    if (this.disableShootingStars) {
      return;
    }

    window.requestAnimationFrame(() => this.moveShootingStar());

    if (!this.shootingStar) {
      return;
    }

    const prevStar = Object.assign({}, this.shootingStar);

    const newX =
      prevStar.x + prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
    const newY =
      prevStar.y + prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
    const newDistance = prevStar.distance + prevStar.speed;
    const newScale = 1 + newDistance / 100;

    if (
      newX < -20 ||
      newX > window.innerWidth + 20 ||
      newY < -20 ||
      newY > window.innerHeight + 20
    ) {
      this.shootingStar = undefined;
      return;
    }

    prevStar.x = newX;
    prevStar.y = newY;
    prevStar.distance = newDistance;
    prevStar.scale = newScale;

    this.shootingStar = prevStar;
  }

  private getRandomStartPoint(): { x: number; y: number; angle: number } {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
      case 0:
        return { x: offset, y: 0, angle: 45 };
      case 1:
        return { x: window.innerWidth, y: offset, angle: 135 };
      case 2:
        return { x: offset, y: window.innerHeight, angle: 225 };
      case 3:
        return { x: 0, y: offset, angle: 315 };
      default:
        return { x: 0, y: 0, angle: 45 };
    }
  }
}
