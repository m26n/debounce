import { createEffect, createSignal, For } from "solid-js";
import { debounce } from "./utils/debounce";

interface ClickedEvent {
  timestamp: number;
}

interface ExecutedEvent {
  timestamp: number;
  count: number;
}

function App() {
  const [count, setCount] = createSignal(0);
  const [clickedEvents, setClickedEvents] = createSignal<ClickedEvent[]>([]);
  const [executedEvents, setExecutedEvents] = createSignal<ExecutedEvent[]>([]);

  const debouncedSetCount = debounce(setCount, 1000);

  createEffect(() => {
    setExecutedEvents((events) => [
      ...events,
      {
        timestamp: Date.now(),
        count: count(),
      },
    ]);
  });

  return (
    <section class="flex flex-col gap-12 p-4">
      <section class="flex gap-8">
        <button
          class="bg-gray-200 border border-gray-300 px-2 py-1 rounded cursor-pointer focus-visible:ring"
          onClick={() => {
            setClickedEvents([
              ...clickedEvents(),
              {
                timestamp: Date.now(),
              },
            ]);
            debouncedSetCount((count) => count + 5);
          }}
        >
          click me
        </button>
        <p>{count()}</p>
      </section>
      <section class="flex gap-8">
        <section>
          <h2 class="text-2xl">Clicked Events</h2>
          <ul class="list-disc">
            <For
              each={clickedEvents().toSorted(
                (a, b) => b.timestamp - a.timestamp,
              )}
            >
              {(event, _) => <li>{event.timestamp}</li>}
            </For>
          </ul>
        </section>
        <section>
          <h2 class="text-2xl">Executed Events</h2>
          <ul class="list-disc">
            <For
              each={executedEvents().toSorted(
                (a, b) => b.timestamp - a.timestamp,
              )}
            >
              {(event, _) => (
                <li>
                  {event.timestamp} - {event.count}
                </li>
              )}
            </For>
          </ul>
        </section>
      </section>
    </section>
  );
}

export default App;
