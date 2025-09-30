import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

type Question = {
  id: number;
  question: string;
  options: string[];
  correct?: number; // index ของตัวเลือกที่ถูก
};

type PlayerScore = {
  name: string;
  score: number;
};

const questions: Question[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correct: Math.floor(Math.random() * 4),
}));

export default function QuizWithLeaderboard() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);

  const handleAnswer = (index: number) => {
    if (questions[currentQ].correct === index) setScore(s => s + 1);
    if (currentQ < questions.length - 1) {
      setCurrentQ(s => s + 1);
    } else {
      setShowLeaderboard(true);
    }
  };

  const addScore = () => {
    if (!name) return;
    const newLeaderboard = [...leaderboard, { name, score }];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard);
    setName('');
    setScore(0);
    setCurrentQ(0);
    setShowLeaderboard(false);
  };

  if (!showLeaderboard) {
    const q = questions[currentQ];
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{q.question}</Text>
        {q.options.map((opt, idx) => (
          <TouchableOpacity key={idx} style={styles.option} onPress={() => handleAnswer(idx)}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
        <Text>Question {currentQ + 1}/{questions.length}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Quiz finished! Your score: {score}</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Save Score" onPress={addScore} />

      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Text style={styles.item}>
            {index + 1}. {item.name}: {item.score}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  question: { fontSize: 18, marginBottom: 20 },
  option: { padding: 15, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  item: { fontSize: 16, marginVertical: 2 },
});
