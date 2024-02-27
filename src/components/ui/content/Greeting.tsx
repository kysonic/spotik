import Heading from '@/components/ui/typography/Heading';

export default function Greeting() {
  const date = new Date();
  const h = date.getHours()

  const times = h < 12 ? 'Morning' : h < 20 ? 'Day' : 'Evening';

  return <Heading className="text-start">Good {times}</Heading>;
}
