'use client';

export function RegisteredMessage({ registered }: { registered?: string }) {
  if (!registered) return null;

  return (
    <p className="text-sm text-green-500 text-center">
      Registration successful. Please log in.
    </p>
  );
}
