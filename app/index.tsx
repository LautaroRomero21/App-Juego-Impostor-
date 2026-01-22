import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Category, useGame } from "./_layout";

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "jugadores", label: "Jugadores" },
  { key: "comida", label: "Comida" },
  { key: "lugares", label: "Lugares" },
  { key: "deportes", label: "Deportes" },
  { key: "paises", label: "Países" }
];

export default function SetupScreen() {
  const router = useRouter();
  const { startRound } = useGame();

  const [players, setPlayers] = useState("6");
  const [impostors, setImpostors] = useState("1");
  const [category, setCategory] = useState<Category | null>("jugadores"); // default

  const p = Number(players);
  const i = Number(impostors);
  const valid =
    Number.isInteger(p) && Number.isInteger(i) && p >= 3 && i >= 1 && i < p && !!category;

  const onStart = () => {
    if (!valid || !category) {
      Alert.alert("Parámetros inválidos", "Revisá jugadores/impostores y elegí una categoría.");
      return;
    }
    startRound(p, i, category);
    router.push("/reveal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.centerWrap}>
        <Text style={styles.title}>Impostor</Text>
        <Text style={styles.subtitle}>Elegí jugadores, impostores y la categoría</Text>

        <View style={styles.formRow}>
          <Text style={styles.label}>Jugadores</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={players}
            onChangeText={setPlayers}
            placeholder="Ej: 6"
            placeholderTextColor="#6B7280"
            maxLength={2}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Impostores</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={impostors}
            onChangeText={setImpostors}
            placeholder="Ej: 1"
            placeholderTextColor="#6B7280"
            maxLength={2}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.chipsRow}>
            {CATEGORIES.map((c) => {
              const selected = category === c.key;
              return (
                <Pressable
                  key={c.key}
                  onPress={() => setCategory(c.key)}
                  style={[styles.chip, selected && styles.chipSelected]}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                    {c.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={styles.hint}>Mínimo 3 jugadores y 1 impostor. Solo una categoría por ronda.</Text>

        <Pressable style={[styles.button, !valid && styles.buttonDisabled]} disabled={!valid} onPress={onStart}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1220" },
  centerWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 8, color: "#E5E7EB", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#9CA3AF", marginBottom: 24, textAlign: "center" },

  formRow: { width: "100%", marginBottom: 18 },
  label: { fontSize: 14, color: "#C7D2FE", marginBottom: 8 },
  input: {
    backgroundColor: "#111827", borderWidth: 1, borderColor: "#1F2937", color: "#F9FAFB",
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16,
  },

  chipsRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  chip: {
    paddingVertical: 10, paddingHorizontal: 14, borderRadius: 9999,
    backgroundColor: "#111827", borderWidth: 1, borderColor: "#1F2937"
  },
  chipSelected: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  chipText: { color: "#E5E7EB", fontWeight: "700" },
  chipTextSelected: { color: "#FFFFFF" },

  hint: { textAlign: "center", color: "#9CA3AF", fontSize: 13, marginTop: 6, marginBottom: 20 },

  button: { backgroundColor: "#2563EB", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 14, width: "100%", alignItems: "center" },
  buttonDisabled: { backgroundColor: "#1D4ED8" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
