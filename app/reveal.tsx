import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Category, useGame } from "./_layout";

const LABELS: Record<Category, string> = {
  jugadores: "Jugadores",
  comida: "Comida",
  lugares: "Lugares",
  deportes: "Deportes",
  paises: "Países"
};

export default function RevealScreen() {
  const router = useRouter();
  const { round } = useGame();
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!round) { router.replace("/"); return null; }

  const { assignments, secret, category } = round;
  const role = assignments[idx];
  const isLast = idx === assignments.length - 1;

  const hintCivil =
    category === "jugadores"
      ? "No digas el nombre; describilo sutilmente."
      : "No digas la palabra; describila sutilmente.";
  const hintImpostor =
    category === "jugadores"
      ? "Disimulá como si supieras el nombre."
      : "Disimulá como si supieras la palabra.";

  const handleTap = () => {
    if (!revealed) { setRevealed(true); return; }
    setRevealed(false);
    const next = idx + 1;
    if (next < assignments.length) setIdx(next);
    else router.replace("/end");
  };

  return (
    <SafeAreaView style={revealed ? styles.revealContainer : styles.blackContainer}>
      <StatusBar style="light" />
      <Pressable style={styles.centerPressable} onPress={handleTap}>
        {revealed ? (
          <View style={styles.card}>
            <Text style={styles.smallMuted}>
              Jugador {idx + 1} de {assignments.length} · Categoría: {LABELS[category]}
            </Text>
            {role === "IMPOSTOR" ? (
              <>
                <Text style={styles.roleImpostor}>IMPOSTOR</Text>
                <Text style={styles.roleHint}>{hintImpostor}</Text>
              </>
            ) : (
              <>
                <Text style={styles.roleCivil}>{secret}</Text>
                <Text style={styles.roleHint}>{hintCivil}</Text>
              </>
            )}
            <View style={{ height: 16 }} />
            <Text style={styles.tapToHide}>
              Tocá para volver a negro {isLast ? "y empezar el juego" : "y pasar el celu"}.
            </Text>
          </View>
        ) : (
          <Text style={styles.blackMessage}>Tocá para ver tu rol</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerPressable: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  blackContainer: { flex: 1, backgroundColor: "black" },
  blackMessage: { color: "#E5E7EB", fontSize: 20, fontWeight: "800", textAlign: "center" },
  revealContainer: { flex: 1, backgroundColor: "#0B1220" },
  card: {
    backgroundColor: "#111827", borderRadius: 18, paddingVertical: 28, paddingHorizontal: 22,
    width: "92%", maxWidth: 520, alignItems: "center", borderWidth: 1, borderColor: "#1F2937",
  },
  smallMuted: { fontSize: 12, color: "#94A3B8", marginBottom: 10, textAlign: "center" },
  roleImpostor: { fontSize: 40, fontWeight: "900", color: "#F87171", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" },
  roleCivil: { fontSize: 32, fontWeight: "900", color: "#E5E7EB", textAlign: "center" },
  roleHint: { marginTop: 10, fontSize: 14, color: "#9CA3AF", textAlign: "center" },
  tapToHide: { fontSize: 13, color: "#C7D2FE", textAlign: "center" },
});
