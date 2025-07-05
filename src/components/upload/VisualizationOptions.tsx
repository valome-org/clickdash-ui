
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BarChart3, Donut, LineChart, PieChart, ScatterChart, TrendingUp } from "lucide-react";

interface VisualizationOptionsProps {
  chartTypes: string[];
  onChartTypesChange: (chartTypes: string[]) => void;
  numberOfCharts: string;
  onNumberOfChartsChange: (numberOfCharts: string) => void;
  disabled?: boolean;
}

const chartTypeOptions = [
  { value: "bar", label: "Bar Chart", icon: BarChart3 },
  { value: "line", label: "Line Chart", icon: LineChart },
  { value: "pie", label: "Pie Chart", icon: PieChart },
  { value: "scatter", label: "Scatter Plot", icon: ScatterChart },
  { value: "area", label: "Area Chart", icon: TrendingUp },
  { value: "doughnut", label: "Doughnut Chart", icon: Donut },
];

export function VisualizationOptions({
  chartTypes,
  onChartTypesChange,
  numberOfCharts,
  onNumberOfChartsChange,
  disabled = false,
}: VisualizationOptionsProps) {
  const toggleChartType = (type: string) => {
    if (chartTypes.includes(type)) {
      onChartTypesChange(chartTypes.filter((t) => t !== type));
    } else {
      onChartTypesChange([...chartTypes, type]);
    }
  };

  return (
    <div className= "space-y-6" >
    <div>
    <Label className="text-base font-medium" > Chart Types </Label>
      < p className = "text-sm text-muted-foreground mb-3" >
        Select the types of charts you would like to see(optional - AI will choose if none selected)
  </p>
    < div className = "grid grid-cols-2 md:grid-cols-3 gap-2" >
    {
      chartTypeOptions.map((option) => {
        const IconComponent = option.icon;
        return (
          <Button
                key= { option.value }
        type = "button"
        variant = { chartTypes.includes(option.value) ? "default" : "outline" }
        className = "justify-start h-auto py-3"
        onClick = {() => toggleChartType(option.value)
      }
                disabled = { disabled }
        >
        <IconComponent className="h-4 w-4 mr-2" />
      <span className="text-sm" > { option.label } </span>
      </Button>
      );
    })
}
</div>
  </div>

  < div >
  <Label className="text-base font-medium" > Number of Charts </Label>
    < p className = "text-sm text-muted-foreground mb-3" >
      How many charts would you like to generate ?
        </p>
        < RadioGroup
          value = { numberOfCharts }
onValueChange = { onNumberOfChartsChange }
className = "grid grid-cols-4 gap-2"
disabled = { disabled }
  >
{
  ["3", "4", "5", "6"].map((num) => (
    <div key= { num } >
    <RadioGroupItem
                value={ num }
                id = {`charts-${num}`}
className = "peer sr-only"
  />
  <Label
                htmlFor={ `charts-${num}` }
className = "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
  >
  <span className="text-lg font-semibold" > { num } </span>
    < span className = "text-xs text-muted-foreground" > charts </span>
      </Label>
      </div>
          ))}
</RadioGroup>
  </div>
  </div>
  );
}
