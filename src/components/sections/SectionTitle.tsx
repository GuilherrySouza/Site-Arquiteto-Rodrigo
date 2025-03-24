
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionTitle = ({
  subtitle,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div
      className={cn(
        "max-w-3xl space-y-4 mb-12 md:mb-16",
        alignmentClasses[align],
        className
      )}
    >
      {subtitle && (
        <p className="subtitle opacity-0 animate-slide-up">{subtitle}</p>
      )}
      <h2 className="h2 opacity-0 animate-slide-up">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground opacity-0 animate-slide-up">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
