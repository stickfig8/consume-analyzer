type Props = {
  title: string;
};
export default function ResultCardTitle({ title }: Props) {
  return <h2 className="text-xl font-semibold">{title}</h2>;
}
