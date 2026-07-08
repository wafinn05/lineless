import type { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <div className="empty">
      <div className="e-ic" aria-hidden>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <button className="e-btn" onClick={onAction}>
        {actionLabel}
      </button>
    </div>
  );
}
