export default function Button({ children, textOnly, classes, ...props }) {
  let cssClasses = textOnly ? "text-button " : "button ";
  cssClasses += classes;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
