import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const colorPickerColors: string[] = [
  '#aab8c1',
  '#ff681f',
  '#fab71e',
  '#7fdbb5',
  '#17d086',
  '#91d2fa',
  '#e9234f',
  '#f58ea9',
];

export interface IFormColorPickerProps {
  onChange: (...event: any[]) => void;
  defaultValue: string;
}

export default function FormColorPicker({
  onChange,
  defaultValue = colorPickerColors[0],
}: IFormColorPickerProps) {
  return (
    <FormItem>
      <FormLabel>Color</FormLabel>
      <FormControl>
        <RadioGroup
          onChange={onChange}
          defaultValue={defaultValue}
          className="flex"
        >
          {colorPickerColors.map((color) => (
            <FormItem key={'radioBtn-' + color}>
              <RadioGroupItem
                id={color}
                value={color}
                style={{ backgroundColor: color }}
                className="h-8 w-8"
              />
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
