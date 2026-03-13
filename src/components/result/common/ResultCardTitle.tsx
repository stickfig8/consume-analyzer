type Props = {
  title: string;
};
export default function ResultCardTitle({ title }: Props) {
  return (
    <h2 className="text-xl font-semibold max-[700px]:text-base">{title}</h2>
  );
}
