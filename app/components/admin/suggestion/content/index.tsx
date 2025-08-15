"use client";

import { useState, useTransition } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { addSuggestion, deleteSuggestion } from "../actions/suggestionsActions";
import { Suggestion } from "@/app/types/shared/suggestion/suggestion";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import {
  Card,
  CardContent
} from "@/app/components/ui/card";
import AdminSectionHeader from "../../admin-section-header";

export default function SuggestionsEditor({
  initialSuggestions,
}: {
  initialSuggestions: Suggestion[];
}) {
  const { t } = useTranslation("dashboard");
  const [suggestions, setSuggestions] =
    useState<Suggestion[]>(initialSuggestions);
  const [newName, setNewName] = useState("");
  const [isPending, startTransition] = useTransition();

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      if (newName.trim() && !isPending) {
        handleAdd();
      }
    },
    enabled: !!newName.trim() && !isPending,
  });

  const handleAdd = () => {
    if (!newName.trim()) return;
    startTransition(async () => {
      const promise = addSuggestion(newName).then((added) => {
        setSuggestions((prev) => [...prev, added]);
        setNewName("");
      });

      toast.promise(promise, {
        loading: t("suggestions.adding"),
        success: t("suggestions.added"),
        error: t("suggestions.errorAdding"),
      });
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const promise = deleteSuggestion(id).then(() => {
        setSuggestions((prev) => prev.filter((s) => s.id !== id));
      });

      toast.promise(promise, {
        loading: t("suggestions.deleting"),
        success: t("suggestions.deleted"),
        error: t("suggestions.errorDeleting"),
      });
    });
  };

  return (
    <>
      <section className="section-container my-10">
        <Card className="w-full max-w-5xl mx-auto">
          <AdminSectionHeader title={t("suggestions.title")} />
          <CardContent className="space-y-6 p-4 md-p-6">
            {/* Add Section */}
            <div className="relative flex w-full gap-2">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t("suggestions.placeholder") ?? ""}
              />
              <Button
                type="button"
                size="sm"
                // variant="outline"
                onClick={handleAdd}
                disabled={!newName.trim() || isPending}
                className="flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {/* Suggestions List */}
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {suggestions.map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    <span>{s.name}</span>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-muted-foreground hover:text-red-500 transition"
                      aria-label={t("suggestions.deleteItem", { name: s.name })}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {suggestions.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  {t("suggestions.noSuggestions") ??
                    "No suggestions added yet."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
