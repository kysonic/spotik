import FormCard from '@/app/components/ui/forms/FormCard';
import Heading from '@/app/components/ui/typography/Heading';
import Input from '@/app/components/ui/forms/Input';
import Button from '@/app/components/ui/forms/Button';

export default function LoginPage() {
  return (
    <FormCard>
      <Heading>Spotik</Heading>
      <Input type="email" autoComplete="off" placeholder="Enter your email" />
      <Input type="password" autoComplete="off" placeholder="Enter your password" />
      <Button>Submit</Button>
    </FormCard>
  );
}
