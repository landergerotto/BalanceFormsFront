export function time_formatter(time) {
    hours = int(int(time) / 3600);
    minutes = int((int(time) % 3600) / 60);
    seconds = int(int(time) % 60);
    time = `${hours}:${minutes}:${seconds}`;
    return time;
}