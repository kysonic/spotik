export type SliderProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export default function Slider(props: SliderProps) {
  return (
    <input
      type="range"
      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      {...props}
    ></input>
  );
}
