import parse, {
  domToReact,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { getPercentColor } from "./calculate";

export function parseMarkedText(text: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.type !== "tag") return;

      const content = domToReact(domNode.children);

      switch (domNode.name) {
        case "cat":
          return <span className="text-blue-500 font-semibold">{content}</span>;

        case "money":
          return <span className="text-slate-700 font-bold">{content}</span>;

        case "percent": {
          const rawText = domNode.children?.[0]?.data ?? "";
          const colorClass = getPercentColor(rawText);

          return (
            <span
              className={`${colorClass} font-semibold underline underline-offset-2`}
            >
              {content}
            </span>
          );
        }

        case "adjust":
          return (
            <span className="text-white bg-[var(--fixed-color)] rounded-[2px] mx-[2px] px-[3px]">
              {content}
            </span>
          );

        default:
          return undefined; // unknown tag 무시 xss 방지
      }
    },
  };

  return parse(text, options);
}
