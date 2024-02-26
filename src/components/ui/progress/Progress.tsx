export type ProgressBarProps = {
  progress: number;
}

export default function ProgressBar({ progress = 0 }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 mb-4 dark:bg-gray-700">
      <div
        className="bg-gray-600 h-1 rounded-full dark:bg-gray-300"
        style={{width: `${progress}%`}}
      ></div>
    </div>
  );
}
