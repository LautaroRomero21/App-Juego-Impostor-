import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Category, useGame } from "./_layout";

const LABELS: Record<Category, string> = {
  jugadores: "Jugadores",
  comida: "Comida",
  lugares: "Lugares",
  deportes: "Deportes",
  paises: "Países"
};

export default function EndScreen() {
  const router = useRouter();
  const { players, impostors, round, rematch, resetGame } = useGame();

  useEffect(() => {
    if (!round) router.replace("/");
  }, [round, router]);

  const onRematch = () => {
    rematch();
    router.replace("/reveal");
  };

  const onNew = () => {
    resetGame();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.centerWrap}>
        <Text style={styles.title}>¡Roles repartidos!</Text>
        {round && <Text style={styles.category}>Categoría: {LABELS[round.category]}</Text>}
        <Text style={styles.summary}>
          Hay {players} jugadores y {impostors} impostor{impostors !== 1 ? "es" : ""}.
          {"\n"}Ahora sí: ¡empieza el juego!
        </Text>

        <View style={{ height: 24 }} />
        <Pressable style={styles.button} onPress={onRematch}>
          <Text style={styles.buttonText}>Nueva ronda (mismos parámetros)</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.secondaryBtn]} onPress={onNew}>
          <Text style={styles.secondaryBtnText}>Nueva partida</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1220" },
  centerWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: "800", marginBottom: 8, color: "#E5E7EB", textAlign: "center" },
  category: { fontSize: 14, color: "#C7D2FE", marginBottom: 6, textAlign: "center" },
  summary: { fontSize: 16, color: "#9CA3AF", textAlign: "center", marginTop: 4 },
  button: { backgroundColor: "#2563EB", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 14, width: "100%", alignItems: "center", marginTop: 12 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
  secondaryBtn: { backgroundColor: "#111827" },
  secondaryBtnText: { color: "#E5E7EB", fontSize: 16, fontWeight: "700" },
});
