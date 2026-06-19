export default function Loading() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <div
        role="status"
        aria-label="Loading"
        className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-brand-600"
      />
    </div>
  );
}
