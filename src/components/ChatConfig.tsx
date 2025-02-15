import { Select, MenuItem, Slider } from '@mui/material'

interface ChatConfigProps {
  model: string;
  setModel: (value: string) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  temperature: number;
  setTemperature: (value: number) => void;
}

export function ChatConfig({
  model,
  setModel,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature
}: ChatConfigProps) {
  return (
    <div className="flex items-center space-x-4 px-4 py-2 border-b dark:border-gray-700">
      <Select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        size="small"
        sx={{ width: 120 }}
      >
        <MenuItem value="gpt-3.5-turbo">GPT-3.5</MenuItem>
        <MenuItem value="gpt-4">GPT-4</MenuItem>
      </Select>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm">最大Token:</span>
        <Slider
          value={maxTokens}
          onChange={(_, value) => setMaxTokens(value as number)}
          min={100}
          max={4000}
          step={100}
          className="w-32"
        />
        <span className="text-sm">{maxTokens}</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm">温度:</span>
        <Slider
          value={temperature}
          onChange={(_, value) => setTemperature(value as number)}
          min={0}
          max={2}
          step={0.1}
          className="w-32"
        />
        <span className="text-sm">{temperature}</span>
      </div>
    </div>
  )
} 