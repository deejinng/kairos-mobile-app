// app/(main)/watch.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';

export default function WatchScreen() {
  const router = useRouter();

  const playAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/song.mp3')
    );
    await sound.playAsync();
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0F172A' }}
      contentContainerStyle={{ padding: 22, paddingBottom: 60 }}
    >
      {/* Back */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Go Back · Kairos</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.header}>A Call to Intimacy</Text>

      {/* Intro */}
      <Text style={styles.paragraph}>
        Man was never created for distance from God.
        From Eden to Calvary, the cry of heaven has always been the same:
        fellowship.
      </Text>

      <Text style={styles.paragraph}>
        In Matthew 4, Jesus withdrew to fast and pray.
        In Deuteronomy 8:18, God reminded Israel that power flows from Him.
        In Luke 18:1, Jesus taught that men ought always to pray and not faint.
      </Text>

      <Text style={styles.paragraph}>
        Jesus walked the earth in constant communion with the Father.
        Prayer was not a routine — it was His lifeline.
      </Text>

      {/* Prayer */}
      <Text style={styles.bold}>Prayer</Text>

      <Text style={styles.paragraph}>
        Prayer is not information transfer.
        It is relationship.
        It is alignment.
        It is dependence.
      </Text>

      {/* Watching */}
      <Text style={styles.bold}>Watching</Text>

      <Text style={styles.paragraph}>
        “I will stand upon my watch…” — Habakkuk 2:1
      </Text>

      <Text style={styles.paragraph}>
        Watching is spiritual attentiveness.
        It is staying awake to what God is doing and saying.
        A believer who does not watch will eventually drift.
      </Text>

      {/* Prayer Watches */}
      <Text style={styles.section}>Prayer Watches</Text>

      <Text style={styles.paragraph}>
        Prayer watches are sacred time gates.
        They align the believer with God’s movements in the earth.
        Scripture reveals that God responds differently at different hours.
      </Text>

      <Text style={styles.paragraph}>
        When a Christian honors prayer watches, spiritual authority increases,
        sensitivity sharpens, and discipline is formed.
      </Text>

      {/* Gates */}
      <Text style={styles.section}>The Eight Gates of Prayer</Text>

      {/* 6AM */}
      <Gate
        title="6AM — Hour of Intimacy"
        scripture="Mark 1:35 · Psalm 5:3"
        text="This is the morning watch. Jesus rose early to pray.
        It sets the tone of the entire day.
        Direction, grace, and strength are received here."
      />

      {/* 9AM */}
      <Gate
        title="9AM — Third Hour"
        scripture="Acts 2:15"
        text="This is the hour of consecration.
        The Spirit was poured out at this hour.
        It is a time to surrender the day fully to God."
      />

      {/* 12PM */}
      <Gate
        title="12PM — Midday Watch"
        scripture="Genesis 18:1"
        text="Abraham encountered God at noon.
        This watch renews focus and restores spiritual alertness."
      />

      {/* 3PM */}
      <Gate
        title="3PM — Hour of Mercy"
        scripture="Acts 3:1 · Daniel 9:21"
        text="Known as the hour of evening sacrifice.
        It is a powerful time for mercy, healing, and answered prayer."
      />

      {/* 6PM */}
      <Gate
        title="6PM — Evening Intimacy"
        scripture="Psalm 141:2"
        text="As the day closes, the believer returns to God.
        Gratitude, reflection, and renewal happen here."
      />

      {/* 9PM */}
      <Gate
        title="9PM — Night Watch"
        scripture="Psalm 63:6"
        text="A quiet hour of deep reflection.
        The soul learns to wait on God in stillness."
      />

      {/* 12AM */}
      <Gate
        title="12AM — Midnight Watch (Warfare)"
        scripture="Acts 16:25 · Matthew 26:36"
        text="Paul and Silas prayed at midnight.
        Jesus prayed in the night.
        This is a powerful hour for deliverance and spiritual warfare."
      />

      {/* Audio */}
      <Text style={styles.section}>Prepare Your Spirit</Text>

      <TouchableOpacity onPress={playAudio} style={styles.audioBtn}>
        <Text style={styles.audioText}>Play Prayer Audio</Text>
      </TouchableOpacity>

      {/* Impact */}
      <Text style={styles.section}>How This Practice Shapes a Believer</Text>

      <Bullet text="Heightened spiritual sensitivity" />
      <Bullet text="Deeper intimacy with God" />
      <Bullet text="Stronger discipline and consistency" />
      <Bullet text="Clearer spiritual direction" />
      <Bullet text="Greater authority in prayer" />

      <Text style={styles.paragraph}>
        Prayer watches do not make God closer —
        they make *us* more aware.
      </Text>
    </ScrollView>
  );
}

/* ---------- Helpers ---------- */

function Gate({
  title,
  scripture,
  text,
}: {
  title: string;
  scripture: string;
  text: string;
}) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.gateTitle}>{title}</Text>
      <Text style={styles.scripture}>{scripture}</Text>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <Text style={{ color: '#CBD5E1', fontSize: 16, marginBottom: 6 }}>
      • {text}
    </Text>
  );
}

/* ---------- Styles ---------- */

const styles = {
  back: {
    color: '#93C5FD',
    fontSize: 16,
    marginBottom: 16,
  },
  header: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  section: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 10,
  },
  bold: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 24,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 26,
    marginBottom: 10,
  },
  scripture: {
    fontSize: 15,
    color: '#93C5FD',
    marginBottom: 6,
  },
  gateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  audioBtn: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  audioText: {
    color: '#93C5FD',
    fontSize: 16,
    fontWeight: '600',
  },
};
