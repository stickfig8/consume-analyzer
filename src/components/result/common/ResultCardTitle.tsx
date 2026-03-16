type Props = {
  title: string;
};
export default function ResultCardTitle({ title }: Props) {
  return (
    <h2 className="text-lg font-semibold max-[700px]:text-base">{title}</h2>
  );
}
