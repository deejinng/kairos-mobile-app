// app/(main)/scribe.tsx
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Navbar from '../../components/Navbar';

const { width } = Dimensions.get('window');

type ViewMode = 'grid' | 'stack';
type EntryTag = 'prayer' | 'instruction' | 'insight' | 'song' | 'dream' | 'testimony' | 'burden';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  tag: EntryTag;
  scriptureRef?: string;
  timestamp: Date;
}

const tagColors: Record<EntryTag, string> = {
  prayer: '#3B82F6',
  instruction: '#8B5CF6',
  insight: '#F59E0B',
  song: '#EC4899',
  dream: '#06B6D4',
  testimony: '#10B981',
  burden: '#EF4444',
};

const tagLabels: Record<EntryTag, string> = {
  prayer: 'Prayer',
  instruction: 'Instruction',
  insight: 'Scripture Insight',
  song: 'Song / Poem',
  dream: 'Dream',
  testimony: 'Testimony',
  burden: 'Burden / Prayer Point',
};

export default function ScribeScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>('stack');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);

  // Editor state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [scriptureRef, setScriptureRef] = useState('');
  const [selectedTag, setSelectedTag] = useState<EntryTag>('prayer');

  const createNewEntry = () => {
    setCurrentEntry(null);
    setTitle('');
    setContent('');
    setScriptureRef('');
    setSelectedTag('prayer');
    setShowEditor(true);
  };

  const saveEntry = () => {
    if (!content.trim()) {
      Alert.alert('Empty Entry', 'Please write something before saving');
      return;
    }

    const entry: JournalEntry = {
      id: currentEntry?.id || Date.now().toString(),
      title: title.trim() || 'Untitled',
      content: content.trim(),
      tag: selectedTag,
      scriptureRef: scriptureRef.trim() || undefined,
      timestamp: currentEntry?.timestamp || new Date(),
    };

    if (currentEntry) {
      setEntries(entries.map(e => e.id === entry.id ? entry : e));
    } else {
      setEntries([entry, ...entries]);
    }

    setShowEditor(false);
    setTitle('');
    setContent('');
    setScriptureRef('');
  };

  const editEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setScriptureRef(entry.scriptureRef || '');
    setSelectedTag(entry.tag);
    setShowEditor(true);
  };

  const deleteEntry = (id: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this journal entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setEntries(entries.filter(e => e.id !== id)),
        },
      ]
    );
  };

  const exportToPDF = () => {
    Alert.alert('Coming Soon', 'PDF export will be available in the next update.');
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.container}>
      {!showEditor ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Kairos</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity
                onPress={() => setViewMode(viewMode === 'grid' ? 'stack' : 'grid')}
                style={styles.viewToggle}
              >
                <Text style={styles.viewToggleText}>
                  {viewMode === 'grid' ? '▦' : '☰'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={createNewEntry} style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={[
              styles.entriesContainer,
              viewMode === 'grid' && styles.entriesGrid,
            ]}
          >
            {entries.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Your Journal Awaits</Text>
                <Text style={styles.emptyText}>
                  Capture what God speaks. Write down instructions, prayers, dreams, and testimonies.
                </Text>
                <Text style={styles.emptySubtext}>
                  Tap the + to begin
                </Text>
              </View>
            ) : (
              entries.map((entry) => (
                <TouchableOpacity
                  key={entry.id}
                  style={[
                    styles.entryCard,
                    viewMode === 'grid' && styles.entryCardGrid,
                  ]}
                  onPress={() => editEntry(entry)}
                  onLongPress={() => deleteEntry(entry.id)}
                >
                  <View style={styles.entryHeader}>
                    <View
                      style={[
                        styles.entryTag,
                        { backgroundColor: tagColors[entry.tag] },
                      ]}
                    >
                      <Text style={styles.entryTagText}>{tagLabels[entry.tag]}</Text>
                    </View>
                    <Text style={styles.entryTimestamp}>
                      {formatTimestamp(entry.timestamp)}
                    </Text>
                  </View>

                  {entry.scriptureRef && (
                    <Text style={styles.entryScripture}>{entry.scriptureRef}</Text>
                  )}

                  <Text style={styles.entryTitle} numberOfLines={2}>
                    {entry.title}
                  </Text>
                  <Text style={styles.entryContent} numberOfLines={4}>
                    {entry.content}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </>
      ) : (
        <View style={styles.editorContainer}>
          <View style={styles.editorHeader}>
            <TouchableOpacity onPress={saveEntry} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={exportToPDF} style={styles.exportButton}>
              <Text style={styles.exportButtonText}>Export PDF</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="Title (optional)"
            placeholderTextColor="#BFDBFE"
            value={title}
            onChangeText={setTitle}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagSelector}>
            {(Object.keys(tagLabels) as EntryTag[]).map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => setSelectedTag(tag)}
                style={[
                  styles.tagOption,
                  selectedTag === tag && {
                    backgroundColor: tagColors[tag],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagOptionText,
                    selectedTag === tag && styles.tagOptionTextSelected,
                  ]}
                >
                  {tagLabels[tag]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TextInput
            style={styles.scriptureInput}
            placeholder="Scripture Reference (e.g., John 3:16)"
            placeholderTextColor="#BFDBFE"
            value={scriptureRef}
            onChangeText={setScriptureRef}
          />

          <TextInput
            style={styles.contentInput}
            placeholder="Write what the Lord has spoken..."
            placeholderTextColor="#BFDBFE"
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            autoFocus
          />

          <TouchableOpacity
            onPress={() => setShowEditor(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <Navbar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },

  viewToggle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewToggleText: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 28,
    color: '#1E3A8A',
    fontWeight: '300',
  },

  entriesContainer: {
    padding: 24,
    paddingBottom: 140,
  },

  entriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },

  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 17,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 12,
  },

  emptySubtext: {
    fontSize: 15,
    color: '#BFDBFE',
    textAlign: 'center',
  },

  entryCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },

  entryCardGrid: {
    width: width * 0.42,
  },

  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  entryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  entryTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  entryTimestamp: {
    fontSize: 12,
    color: '#BFDBFE',
  },

  entryScripture: {
    fontSize: 13,
    color: '#FDE68A',
    fontWeight: '600',
    marginBottom: 8,
  },

  entryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  entryContent: {
    fontSize: 15,
    color: '#E5E7EB',
    lineHeight: 22,
  },

  editorContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },

  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  saveButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 20,
  },

  saveButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E3A8A',
  },

  exportButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },

  exportButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  titleInput: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },

  tagSelector: {
    marginBottom: 16,
    maxHeight: 50,
  },

  tagOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginRight: 8,
  },

  tagOptionText: {
    fontSize: 13,
    color: '#BFDBFE',
    fontWeight: '600',
  },

  tagOptionTextSelected: {
    color: '#FFFFFF',
  },

  scriptureInput: {
    fontSize: 15,
    color: '#FDE68A',
    backgroundColor: 'rgba(253,230,138,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(253,230,138,0.3)',
  },

  contentInput: {
    flex: 1,
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 26,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  cancelButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});