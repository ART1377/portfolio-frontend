import { fetchSuggestions } from "@/app/lib/fetch/admin/fetchSuggestions";
import SuggestionsEditor from "./content";

export default async function AdminSuggestions() {
  const suggestions = await fetchSuggestions();

  return <SuggestionsEditor initialSuggestions={suggestions} />;
}
