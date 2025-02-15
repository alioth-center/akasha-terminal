import { Select } from './ui/Select'
import { Slider } from './ui/Slider'

export function ChatConfig({
  model,
  setModel,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature
}) {
  return (
    <div className="flex items-center space-x-4 px-4 py-2 border-b dark:border-gray-700">
      <Select
        value={model}
        onChange={setModel}
        options={[
          { label: 'GPT-3.5', value: 'gpt-3.5-turbo' },
          { label: 'GPT-4', value: 'gpt-4' },
        ]}
        className="w-32"
      />
      
      <div className="flex items-center space-x-2">
        <span className="text-sm">最大Token:</span>
        <Slider
          value={maxTokens}
          onChange={setMaxTokens}
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
          onChange={setTemperature}
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