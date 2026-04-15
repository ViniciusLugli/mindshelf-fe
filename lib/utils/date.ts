const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(value?: string) {
  if (!value) {
    return "Agora";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Agora";
  }

  return dateTimeFormatter.format(date);
}

export function formatTime(value?: string) {
  if (!value) {
    return "--:--";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return timeFormatter.format(date);
}
