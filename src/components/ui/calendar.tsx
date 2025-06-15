
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CaptionProps, DayPicker, useDayPicker, useNavigation } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

function CustomCaption(props: CaptionProps) {
  const { goToMonth, month } = useNavigation();
  const { fromYear, toYear } = useDayPicker();

  const handleMonthChange = (value: string) => {
    goToMonth(new Date(month.getFullYear(), parseInt(value, 10), 1));
  };

  const handleYearChange = (value: string) => {
    goToMonth(new Date(parseInt(value, 10), month.getMonth(), 1));
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: format(new Date(2000, i, 1), 'MMMM'),
  }));

  const years: { value: string, label: string }[] = [];
  if (fromYear && toYear) {
    for (let i = toYear; i >= fromYear; i--) {
        years.push({ value: i.toString(), label: i.toString() });
    }
  }

  return (
    <div className="flex justify-center gap-4 mb-4">
      <div className="flex flex-col items-start">
        <span className="text-gray-300 text-sm mb-1 ml-1">Month</span>
        <Select value={month.getMonth().toString()} onValueChange={handleMonthChange}>
          <SelectTrigger className="w-[120px] bg-card-dark-gray border-card-gold/30 text-white focus:border-card-gold">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="bg-card-charcoal border-card-gold/50 text-white">
            {months.map((m) => (
              <SelectItem key={m.value} value={m.value} className="focus:bg-card-gold/20">
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-gray-300 text-sm mb-1 ml-1">Year</span>
        <Select value={month.getFullYear().toString()} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[90px] bg-card-dark-gray border-card-gold/30 text-white focus:border-card-gold">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-card-charcoal border-card-gold/50 text-white">
            <ScrollArea className="h-48">
              {years.map((y) => (
                <SelectItem key={y.value} value={y.value} className="focus:bg-card-gold/20">
                  {y.label}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  useCustomCaption?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  useCustomCaption = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: useCustomCaption ? "hidden" : "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: useCustomCaption ? CustomCaption : undefined,
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        ...props.components
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
