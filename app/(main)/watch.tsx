// // app/(main)/watch.tsx
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Dimensions,
//   Linking,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Navbar from '../../components/Navbar';

// const { width } = Dimensions.get('window');

// // YouTube video data - replace with your actual video IDs
// const videos = [
//   {
//     id: '1',
//     title: 'Introduction to Prayer Watches',
//     description: 'Understanding the biblical foundation of prayer watches and their significance in spiritual warfare.',
//     youtubeId: 'YOUR_VIDEO_ID_HERE', // Replace with actual YouTube video ID
//     scripture: 'Habakkuk 2:1'
//   },
//   {
//     id: '2',
//     title: 'The Significance of Sacred Hours',
//     description: 'Why God ordained specific times for prayer and how they align with spiritual authority.',
//     youtubeId: 'YOUR_VIDEO_ID_HERE',
//     scripture: '1 Thessalonians 5:17'
//   },
//   {
//     id: '3',
//     title: 'How Prayer Watches Transform Your Life',
//     description: 'Testimonies and teachings on the impact of consistent watchful prayer.',
//     youtubeId: 'YOUR_VIDEO_ID_HERE',
//     scripture: 'Mark 14:38'
//   },
// ];

// export default function WatchScreen() {
//   const router = useRouter();
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

//   const openYouTubeVideo = (youtubeId: string) => {
//     // Opens YouTube video in browser or YouTube app
//     const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
//     Linking.openURL(youtubeUrl);
//   };

//   return (
//     <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.back}>← Go Back</Text>
//         </TouchableOpacity>

//         <Text style={styles.header}>The Watch</Text>
//         <Text style={styles.subtitle}>Understanding Prayer & the Sacred Hours</Text>

//         {/* INTRO SECTION */}
//         <View style={styles.introBox}>
//           <Text style={styles.introText}>
//             &quot;I will stand upon my watch, and set me upon the tower, and will watch to see what he will say unto me...&quot;
//           </Text>
//           <Text style={styles.scriptureRef}>— Habakkuk 2:1</Text>
//         </View>

//         <Text style={styles.sectionTitle}>What Are Prayer Watches?</Text>
//         <Text style={styles.paragraph}>
//           Prayer watches are divinely appointed times throughout the day and night when believers intentionally pause to commune with God. These sacred hours are not about religious ritual—they are about positioning yourself in the place of intimacy and spiritual authority.
//         </Text>

//         <Text style={styles.paragraph}>
//           From the Old Testament watchmen on the walls to Jesus praying in the early morning hours, Scripture reveals a pattern: God meets those who watch and wait for Him.
//         </Text>

//         <Text style={styles.sectionTitle}>The Sacred Hours</Text>
//         <View style={styles.hoursBox}>
//           <Text style={styles.hoursText}>12am · 3am · 6am · 9am</Text>
//           <Text style={styles.hoursText}>12pm · 3pm · 6pm · 9pm</Text>
//         </View>

//         <Text style={styles.paragraph}>
//           These eight watches divide the day into seasons of prayer. Each hour carries its own spiritual significance, from the midnight cry to the evening sacrifice.
//         </Text>

//         {/* TEACHINGS SECTION */}
//         <Text style={styles.sectionTitle}>Watch & Learn</Text>
//         <Text style={styles.subtitle2}>Teachings on Prayer Watches</Text>

//         {videos.map((video) => (
//           <View key={video.id} style={styles.videoCard}>
//             <TouchableOpacity
//               style={styles.videoHeader}
//               onPress={() => setExpandedVideo(
//                 expandedVideo === video.id ? null : video.id
//               )}
//             >
//               <View style={styles.playIconBox}>
//                 <Text style={styles.playIcon}>▶</Text>
//               </View>
//               <View style={styles.videoInfo}>
//                 <Text style={styles.videoTitle}>{video.title}</Text>
//                 <Text style={styles.videoScripture}>{video.scripture}</Text>
//               </View>
//             </TouchableOpacity>

//             {expandedVideo === video.id && (
//               <View style={styles.videoExpanded}>
//                 <Text style={styles.videoDescription}>{video.description}</Text>
//                 <TouchableOpacity
//                   style={styles.watchButton}
//                   onPress={() => openYouTubeVideo(video.youtubeId)}
//                 >
//                   <Text style={styles.watchButtonText}>WATCH ON YOUTUBE</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         ))}

//         {/* WHY IT MATTERS */}
//         <Text style={styles.sectionTitle}>Why This Matters</Text>
//         <Text style={styles.paragraph}>
//           Prayer watches don&apos;t make God closer—they make you more aware. They break the tyranny of busyness and create space for divine encounter. When you pray at the sacred hours, you join a heavenly rhythm that has been flowing since creation.
//         </Text>

//         <View style={styles.calloutBox}>
//           <Text style={styles.calloutText}>
//             &quot;Men ought always to pray, and not to faint&quot;
//           </Text>
//           <Text style={styles.scriptureRef}>— Luke 18:1</Text>
//         </View>

//         <Text style={styles.paragraph}>
//           This app exists to help you answer that call. To remind you when the watch begins. To give you scripture as you pray. To help you cultivate a lifestyle of unceasing prayer.
//         </Text>

//         <TouchableOpacity
//           style={styles.startButton}
//           onPress={() => router.push('/(main)/home')}
//         >
//           <Text style={styles.startButtonText}>START PRAYING</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <Navbar />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   content: {
//     paddingTop: 80,
//     paddingBottom: 140,
//     paddingHorizontal: 24,
//   },

//   back: {
//     color: '#E0E7FF',
//     fontSize: 16,
//     marginBottom: 20,
//   },

//   header: {
//     fontSize: 40,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     marginBottom: 8,
//   },

//   subtitle: {
//     fontSize: 18,
//     color: '#BFDBFE',
//     marginBottom: 30,
//   },

//   subtitle2: {
//     fontSize: 16,
//     color: '#BFDBFE',
//     marginBottom: 20,
//   },

//   introBox: {
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     padding: 24,
//     borderRadius: 20,
//     marginBottom: 30,
//   },

//   introText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontStyle: 'italic',
//     lineHeight: 28,
//     textAlign: 'center',
//   },

//   scriptureRef: {
//     fontSize: 14,
//     color: '#BFDBFE',
//     textAlign: 'center',
//     marginTop: 12,
//   },

//   sectionTitle: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginTop: 30,
//     marginBottom: 16,
//   },

//   paragraph: {
//     fontSize: 17,
//     color: '#E5E7EB',
//     lineHeight: 28,
//     marginBottom: 16,
//   },

//   hoursBox: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     padding: 20,
//     borderRadius: 16,
//     marginVertical: 20,
//   },

//   hoursText: {
//     fontSize: 19,
//     color: '#FDE68A',
//     fontWeight: '600',
//     textAlign: 'center',
//     marginVertical: 4,
//   },

//   videoCard: {
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: 20,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },

//   videoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },

//   playIconBox: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },

//   playIcon: {
//     fontSize: 20,
//     color: '#1E3A8A',
//     marginLeft: 4,
//   },

//   videoInfo: {
//     flex: 1,
//   },

//   videoTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     marginBottom: 4,
//   },

//   videoScripture: {
//     fontSize: 14,
//     color: '#BFDBFE',
//   },

//   videoExpanded: {
//     padding: 16,
//     paddingTop: 0,
//   },

//   videoDescription: {
//     fontSize: 15,
//     color: '#E5E7EB',
//     lineHeight: 24,
//     marginBottom: 16,
//   },

//   watchButton: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 14,
//     borderRadius: 28,
//     alignItems: 'center',
//   },

//   watchButtonText: {
//     color: '#1E3A8A',
//     fontSize: 15,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },

//   calloutBox: {
//     backgroundColor: 'rgba(253,230,138,0.15)',
//     padding: 24,
//     borderRadius: 20,
//     marginVertical: 24,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FDE68A',
//   },

//   calloutText: {
//     fontSize: 19,
//     color: '#FDE68A',
//     fontWeight: '600',
//     lineHeight: 28,
//     textAlign: 'center',
//   },

//   startButton: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 18,
//     borderRadius: 34,
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 20,
//   },

//   startButtonText: {
//     color: '#1E3A8A',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 1.4,
//   },
// });


// app/(main)/watch.tsx
import { useAudioPlayer } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../../components/Navbar';

const { width } = Dimensions.get('window');

const prayerHours = [
  {
    id: '1',
    time: '6:00 AM',
    name: 'The Morning Watch',
    subtitle: 'Hour of Intimacy & Alignment',
    scriptures: [
      { ref: 'Mark 1:35', text: 'And in the morning, rising up a great while before day, He went out, and prayed.' },
      { ref: 'Psalm 5:3', text: 'My voice shalt thou hear in the morning, O Lord.' },
      { ref: 'Exodus 34:4', text: 'Moses met God early in the morning.' },
    ],
    significance: 'Morning is the hour of first contact. In Scripture, whoever meets God first sets the tone for what follows. This hour governs direction, alignment, and spiritual authority over the day.',
    lifeImpact: 'Whoever controls your morning often controls your day. If your phone gets your first attention, it becomes your altar.',
    benefits: ['Clear direction', 'Reduced anxiety', 'Increased sensitivity', 'Discipline formation'],
    practice: 'Wake up before noise begins. Start with thanksgiving, not requests. Ask: "Lord, order my steps today." Even 15–30 minutes consistently is powerful.',
  },
  {
    id: '2',
    time: '9:00 AM',
    name: 'The Third Hour',
    subtitle: 'Hour of Consecration & Empowerment',
    scriptures: [
      { ref: 'Acts 2:15', text: 'The Holy Spirit was poured out at the third hour.' },
      { ref: 'Daniel 6:10', text: 'Daniel prayed three times daily.' },
    ],
    significance: 'This hour is associated with outpouring, empowerment, and spiritual activation. What is dedicated at this hour gains strength.',
    lifeImpact: 'This is when distractions increase. God calls the believer to re-surrender the day.',
    benefits: ['Fresh anointing', 'Renewed focus', 'Protection from compromise'],
    practice: 'Pause briefly (5–10 minutes if busy). Pray for purity, strength, obedience. Declare: "I will not waste today."',
  },
  {
    id: '3',
    time: '12:00 PM',
    name: 'The Midday Watch',
    subtitle: 'Hour of Spiritual Alertness',
    scriptures: [
      { ref: 'Genesis 18:1', text: 'Abraham encountered God at noon.' },
      { ref: 'Song of Solomon 1:7', text: 'Where thou feedest at noon...' },
    ],
    significance: 'Midday is when weariness sets in. Spiritually, it is a danger zone for drifting.',
    lifeImpact: 'This hour exposes fatigue, loss of focus, and emotional vulnerability.',
    benefits: ['Renewed strength', 'Mental clarity', 'Emotional stability'],
    practice: 'Short prayer and Scripture reading. Reaffirm your purpose. Ask God for renewed focus.',
  },
  {
    id: '4',
    time: '3:00 PM',
    name: 'The Hour of Mercy',
    subtitle: 'Hour of Answered Prayer',
    scriptures: [
      { ref: 'Acts 3:1', text: 'Peter and John went to pray at the ninth hour.' },
      { ref: 'Daniel 9:21', text: 'Angelic response came at the time of evening sacrifice.' },
    ],
    significance: 'This hour carries covenant mercy. It is linked to sacrifice and divine response.',
    lifeImpact: 'This is an excellent hour to pray for healing, restoration, and delayed answers.',
    benefits: ['Increased breakthroughs', 'Divine intervention', 'Grace over past failures'],
    practice: 'Bring specific requests. Pray scriptures aloud. Thank God in advance.',
  },
  {
    id: '5',
    time: '6:00 PM',
    name: 'The Evening Watch',
    subtitle: 'Hour of Reflection & Gratitude',
    scriptures: [
      { ref: 'Psalm 141:2', text: 'Let my prayer be set forth as incense.' },
      { ref: 'Genesis 24:63', text: 'Isaac meditated at eventide.' },
    ],
    significance: 'Evening closes spiritual accounts.',
    lifeImpact: 'What you reflect on at night determines what rests in your heart.',
    benefits: ['Emotional healing', 'Gratitude cultivation', 'Peaceful sleep'],
    practice: 'Review your day with God. Repent quickly where needed. Thank God deliberately.',
  },
  {
    id: '6',
    time: '9:00 PM',
    name: 'The Night Watch',
    subtitle: 'Hour of Quiet Intimacy',
    scriptures: [
      { ref: 'Psalm 63:6', text: 'When I remember thee upon my bed...' },
      { ref: 'Lamentations 2:19', text: 'Rise and cry out in the night.' },
    ],
    significance: 'Night removes distractions. God speaks softly here.',
    lifeImpact: 'This hour develops inner stillness.',
    benefits: ['Deeper intimacy', 'Spiritual sensitivity', 'Reduced noise of the soul'],
    practice: 'Pray slowly. Listen more than you speak. Journal impressions.',
  },
  {
    id: '7',
    time: '12:00 AM',
    name: 'The Midnight Watch',
    subtitle: 'Hour of Warfare & Deliverance',
    scriptures: [
      { ref: 'Acts 16:25', text: 'Paul and Silas prayed at midnight.' },
      { ref: 'Matthew 25:6', text: 'At midnight there was a cry.' },
    ],
    significance: 'Midnight is a spiritual turning point. Chains break here.',
    lifeImpact: 'This hour deals with strongholds, generational issues, and delayed destinies.',
    benefits: ['Deliverance', 'Spiritual authority', 'Breakthroughs'],
    practice: 'Praise first. Pray aggressively. Declare scriptures. Do not do it casually.',
  },
  {
    id: '8',
    time: '3:00 AM',
    name: 'The Watch of Deep Mysteries',
    subtitle: 'Hour of Divine Secrets',
    scriptures: [
      { ref: 'Job 33:15-16', text: 'God speaks when men sleep.' },
      { ref: 'Luke 6:12', text: 'Jesus prayed all night before major decisions.' },
    ],
    significance: 'This hour is for mature believers. Revelation flows here.',
    lifeImpact: 'This hour refines calling and clarity.',
    benefits: ['Revelation', 'Direction', 'Strategic insight'],
    practice: 'Do not force it daily. Come prepared with Scripture. Ask questions, then listen.',
  },
];

export default function WatchScreen() {
  const router = useRouter();
  const [expandedHour, setExpandedHour] = useState<string | null>(null);
  
  const videoSource = require('../../assets/audio/video.mp4');
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
  });

  const audioSource = require('../../assets/audio/song.mp3');
  const audioPlayer = useAudioPlayer(audioSource);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleAudio = () => {
    if (audioPlayer.playing) {
      audioPlayer.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayer.play();
      setIsPlayingAudio(true);
    }
  };

  return (
    <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Go Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>The Watch</Text>
        <Text style={styles.subtitle}>Understanding Prayer & the Sacred Hours</Text>

        {/* VIDEO SECTION */}
        <View style={styles.videoWrapper}>
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* INTRO SECTION */}
        <View style={styles.introBox}>
          <Text style={styles.introText}>
            I will stand upon my watch, and set me upon the tower, and will watch to see what he will say unto me...
          </Text>
          <Text style={styles.scriptureRef}>— Habakkuk 2:1</Text>
        </View>

        <Text style={styles.sectionTitle}>What Are Prayer Watches?</Text>
        <Text style={styles.paragraph}>
          Prayer watches are divinely appointed times throughout the day and night when believers intentionally pause to commune with God. These sacred hours are not about religious ritual—they are about positioning yourself in the place of intimacy and spiritual authority.
        </Text>

        <Text style={styles.paragraph}>
          From the Old Testament watchmen on the walls to Jesus praying in the early morning hours, Scripture reveals a pattern: God meets those who watch and wait for Him.
        </Text>

        {/* THE SACRED HOURS */}
        <Text style={styles.sectionTitle}>The Sacred Hours</Text>
        <View style={styles.hoursBox}>
          <Text style={styles.hoursText}>12am · 3am · 6am · 9am</Text>
          <Text style={styles.hoursText}>12pm · 3pm · 6pm · 9pm</Text>
        </View>

        {/* AUDIO PLAYER */}
        <TouchableOpacity onPress={toggleAudio} style={styles.audioBtn}>
          <Text style={styles.audioText}>
            {isPlayingAudio ? '⏸ Pause Prayer Music' : '▶ Play Prayer Music'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.paragraph}>
          These eight watches divide the day into seasons of prayer. Each hour carries its own spiritual significance, from the midnight cry to the evening sacrifice.
        </Text>

        {/* EACH HOUR DETAILS */}
        {prayerHours.map((hour) => (
          <View key={hour.id} style={styles.hourCard}>
            <TouchableOpacity
              style={styles.hourHeader}
              onPress={() => setExpandedHour(expandedHour === hour.id ? null : hour.id)}
            >
              <View style={styles.hourTimeBox}>
                <Text style={styles.hourTime}>{hour.time}</Text>
              </View>
              <View style={styles.hourInfo}>
                <Text style={styles.hourName}>{hour.name}</Text>
                <Text style={styles.hourSubtitle}>{hour.subtitle}</Text>
              </View>
            </TouchableOpacity>

            {expandedHour === hour.id && (
              <View style={styles.hourExpanded}>
                <Text style={styles.expandedLabel}>Scriptural Foundation</Text>
                {hour.scriptures.map((scripture, idx) => (
                  <View key={idx} style={styles.scriptureItem}>
                    <Text style={styles.scriptureVerse}>{scripture.text}</Text>
                    <Text style={styles.scriptureReference}>— {scripture.ref}</Text>
                  </View>
                ))}

                <Text style={styles.expandedLabel}>Spiritual Significance</Text>
                <Text style={styles.expandedText}>{hour.significance}</Text>

                <Text style={styles.expandedLabel}>Significance in Your Life</Text>
                <Text style={styles.expandedText}>{hour.lifeImpact}</Text>

                <Text style={styles.expandedLabel}>Benefits</Text>
                {hour.benefits.map((benefit, idx) => (
                  <Text key={idx} style={styles.benefitItem}>• {benefit}</Text>
                ))}

                <Text style={styles.expandedLabel}>How to Make It Work</Text>
                <Text style={styles.expandedText}>{hour.practice}</Text>
              </View>
            )}
          </View>
        ))}

        {/* FINAL TRUTH */}
        <View style={styles.calloutBox}>
          <Text style={styles.calloutText}>Final Truth</Text>
          <Text style={styles.calloutSubtext}>Prayer watches do not bind God. They train the believer.</Text>
        </View>

        <Text style={styles.paragraph}>
          This app exists to help you answer that call. To remind you when the watch begins. To give you scripture as you pray. To help you cultivate a lifestyle of unceasing prayer.
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/(main)/home')}
        >
          <Text style={styles.startButtonText}>START PRAYING</Text>
        </TouchableOpacity>
      </ScrollView>

      <Navbar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingTop: 80,
    paddingBottom: 140,
    paddingHorizontal: 24,
  },

  back: {
    color: '#E0E7FF',
    fontSize: 16,
    marginBottom: 20,
  },

  header: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: '#BFDBFE',
    marginBottom: 24,
  },

  videoWrapper: {
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  video: {
    width: width * 0.88,
    height: 220,
    alignSelf: 'center',
  },

  introBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
  },

  introText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: 28,
    textAlign: 'center',
  },

  scriptureRef: {
    fontSize: 14,
    color: '#BFDBFE',
    textAlign: 'center',
    marginTop: 12,
  },

  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 30,
    marginBottom: 16,
  },

  paragraph: {
    fontSize: 17,
    color: '#E5E7EB',
    lineHeight: 28,
    marginBottom: 16,
  },

  hoursBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
  },

  hoursText: {
    fontSize: 19,
    color: '#FDE68A',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 4,
  },

  audioBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 18,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  audioText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  hourCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },

  hourHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  hourTimeBox: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  hourTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  hourInfo: {
    flex: 1,
  },

  hourName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  hourSubtitle: {
    fontSize: 14,
    color: '#BFDBFE',
  },

  hourExpanded: {
    padding: 20,
    paddingTop: 0,
  },

  expandedLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FDE68A',
    marginTop: 16,
    marginBottom: 8,
  },

  expandedText: {
    fontSize: 15,
    color: '#E5E7EB',
    lineHeight: 24,
    marginBottom: 12,
  },

  scriptureItem: {
    marginBottom: 12,
  },

  scriptureVerse: {
    fontSize: 15,
    color: '#FFFFFF',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 4,
  },

  scriptureReference: {
    fontSize: 13,
    color: '#BFDBFE',
  },

  benefitItem: {
    fontSize: 15,
    color: '#E5E7EB',
    lineHeight: 24,
    marginBottom: 4,
  },

  calloutBox: {
    backgroundColor: 'rgba(253,230,138,0.15)',
    padding: 24,
    borderRadius: 20,
    marginVertical: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#FDE68A',
  },

  calloutText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FDE68A',
    marginBottom: 8,
    textAlign: 'center',
  },

  calloutSubtext: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },

  startButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 34,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },

  startButtonText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
});





// THE OLD CODE (I NEED TO ADD SOME YOUTUBE VIDEOS INTO THIS APP LATER ON, ID REACH OUT TO OROKPO AND MAYBE AROME OR SOME APOSTLES ONLINE FOR SOME MATERIALS ON STUFF LIKE THIS....)
// app/(main)/watch.tsx
// import { LinearGradient } from 'expo-linear-gradient';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Dimensions,
//   Linking,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Navbar from '../../components/Navbar';

// const { width } = Dimensions.get('window');

// // YouTube video data - replace with your actual video IDs
// const videos = [
//   {
//     id: '1',
//     title: 'Introduction to Prayer Watches',
//     description: 'Understanding the biblical foundation of prayer watches and their significance in spiritual warfare.',
//     youtubeId: 'YOUR_VIDEO_ID_HERE', // Replace with actual YouTube video ID
//     scripture: 'Habakkuk 2:1'
//   },
//   {
//     id: '2',
//     title: 'The Significance of Sacred Hours',
//     description: 'Why God ordained specific times for prayer and how they align with spiritual authority.',
//     youtubeId: 'YOUR_VIDEO_ID_HERE',
//     scripture: '1 Thessalonians 5:17'
//   },
//   {
//     id: '3',
//     title: 'How Prayer Watches Transform Your Life',
//     description: 'Testimonies and teachings on the impact of consistent watchful prayer.',
//     youtubeId: 'YOUR_VIDEO_ID_HERE',
//     scripture: 'Mark 14:38'
//   },
// ];

// export default function WatchScreen() {
//   const router = useRouter();
//   const [expandedVideo, setExpandedVideo] = useState<string | null>(null);

//   const openYouTubeVideo = (youtubeId: string) => {
//     // Opens YouTube video in browser or YouTube app
//     const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
//     Linking.openURL(youtubeUrl);
//   };

//   return (
//     <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.back}>← Go Back</Text>
//         </TouchableOpacity>

//         <Text style={styles.header}>The Watch</Text>
//         <Text style={styles.subtitle}>Understanding Prayer & the Sacred Hours</Text>

//         {/* INTRO SECTION */}
//         <View style={styles.introBox}>
//           <Text style={styles.introText}>
//             &quot;I will stand upon my watch, and set me upon the tower, and will watch to see what he will say unto me...&quot;
//           </Text>
//           <Text style={styles.scriptureRef}>— Habakkuk 2:1</Text>
//         </View>

//         <Text style={styles.sectionTitle}>What Are Prayer Watches?</Text>
//         <Text style={styles.paragraph}>
//           Prayer watches are divinely appointed times throughout the day and night when believers intentionally pause to commune with God. These sacred hours are not about religious ritual—they are about positioning yourself in the place of intimacy and spiritual authority.
//         </Text>

//         <Text style={styles.paragraph}>
//           From the Old Testament watchmen on the walls to Jesus praying in the early morning hours, Scripture reveals a pattern: God meets those who watch and wait for Him.
//         </Text>

//         <Text style={styles.sectionTitle}>The Sacred Hours</Text>
//         <View style={styles.hoursBox}>
//           <Text style={styles.hoursText}>12am · 3am · 6am · 9am</Text>
//           <Text style={styles.hoursText}>12pm · 3pm · 6pm · 9pm</Text>
//         </View>

//         <Text style={styles.paragraph}>
//           These eight watches divide the day into seasons of prayer. Each hour carries its own spiritual significance, from the midnight cry to the evening sacrifice.
//         </Text>

//         {/* TEACHINGS SECTION */}
//         <Text style={styles.sectionTitle}>Watch & Learn</Text>
//         <Text style={styles.subtitle2}>Teachings on Prayer Watches</Text>

//         {videos.map((video) => (
//           <View key={video.id} style={styles.videoCard}>
//             <TouchableOpacity
//               style={styles.videoHeader}
//               onPress={() => setExpandedVideo(
//                 expandedVideo === video.id ? null : video.id
//               )}
//             >
//               <View style={styles.playIconBox}>
//                 <Text style={styles.playIcon}>▶</Text>
//               </View>
//               <View style={styles.videoInfo}>
//                 <Text style={styles.videoTitle}>{video.title}</Text>
//                 <Text style={styles.videoScripture}>{video.scripture}</Text>
//               </View>
//             </TouchableOpacity>

//             {expandedVideo === video.id && (
//               <View style={styles.videoExpanded}>
//                 <Text style={styles.videoDescription}>{video.description}</Text>
//                 <TouchableOpacity
//                   style={styles.watchButton}
//                   onPress={() => openYouTubeVideo(video.youtubeId)}
//                 >
//                   <Text style={styles.watchButtonText}>WATCH ON YOUTUBE</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         ))}

//         {/* WHY IT MATTERS */}
//         <Text style={styles.sectionTitle}>Why This Matters</Text>
//         <Text style={styles.paragraph}>
//           Prayer watches don&apos;t make God closer—they make you more aware. They break the tyranny of busyness and create space for divine encounter. When you pray at the sacred hours, you join a heavenly rhythm that has been flowing since creation.
//         </Text>

//         <View style={styles.calloutBox}>
//           <Text style={styles.calloutText}>
//             &quot;Men ought always to pray, and not to faint&quot;
//           </Text>
//           <Text style={styles.scriptureRef}>— Luke 18:1</Text>
//         </View>

//         <Text style={styles.paragraph}>
//           This app exists to help you answer that call. To remind you when the watch begins. To give you scripture as you pray. To help you cultivate a lifestyle of unceasing prayer.
//         </Text>

//         <TouchableOpacity
//           style={styles.startButton}
//           onPress={() => router.push('/(main)/home')}
//         >
//           <Text style={styles.startButtonText}>START PRAYING</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <Navbar />
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   content: {
//     paddingTop: 80,
//     paddingBottom: 140,
//     paddingHorizontal: 24,
//   },

//   back: {
//     color: '#E0E7FF',
//     fontSize: 16,
//     marginBottom: 20,
//   },

//   header: {
//     fontSize: 40,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     marginBottom: 8,
//   },

//   subtitle: {
//     fontSize: 18,
//     color: '#BFDBFE',
//     marginBottom: 30,
//   },

//   subtitle2: {
//     fontSize: 16,
//     color: '#BFDBFE',
//     marginBottom: 20,
//   },

//   introBox: {
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     padding: 24,
//     borderRadius: 20,
//     marginBottom: 30,
//   },

//   introText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     fontStyle: 'italic',
//     lineHeight: 28,
//     textAlign: 'center',
//   },

//   scriptureRef: {
//     fontSize: 14,
//     color: '#BFDBFE',
//     textAlign: 'center',
//     marginTop: 12,
//   },

//   sectionTitle: {
//     fontSize: 26,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginTop: 30,
//     marginBottom: 16,
//   },

//   paragraph: {
//     fontSize: 17,
//     color: '#E5E7EB',
//     lineHeight: 28,
//     marginBottom: 16,
//   },

//   hoursBox: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     padding: 20,
//     borderRadius: 16,
//     marginVertical: 20,
//   },

//   hoursText: {
//     fontSize: 19,
//     color: '#FDE68A',
//     fontWeight: '600',
//     textAlign: 'center',
//     marginVertical: 4,
//   },

//   videoCard: {
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: 20,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },

//   videoHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//   },

//   playIconBox: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 14,
//   },

//   playIcon: {
//     fontSize: 20,
//     color: '#1E3A8A',
//     marginLeft: 4,
//   },

//   videoInfo: {
//     flex: 1,
//   },

//   videoTitle: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#FFFFFF',
//     marginBottom: 4,
//   },

//   videoScripture: {
//     fontSize: 14,
//     color: '#BFDBFE',
//   },

//   videoExpanded: {
//     padding: 16,
//     paddingTop: 0,
//   },

//   videoDescription: {
//     fontSize: 15,
//     color: '#E5E7EB',
//     lineHeight: 24,
//     marginBottom: 16,
//   },

//   watchButton: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 14,
//     borderRadius: 28,
//     alignItems: 'center',
//   },

//   watchButtonText: {
//     color: '#1E3A8A',
//     fontSize: 15,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },

//   calloutBox: {
//     backgroundColor: 'rgba(253,230,138,0.15)',
//     padding: 24,
//     borderRadius: 20,
//     marginVertical: 24,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FDE68A',
//   },

//   calloutText: {
//     fontSize: 19,
//     color: '#FDE68A',
//     fontWeight: '600',
//     lineHeight: 28,
//     textAlign: 'center',
//   },

//   startButton: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 18,
//     borderRadius: 34,
//     alignItems: 'center',
//     marginTop: 30,
//     marginBottom: 20,
//   },

//   startButtonText: {
//     color: '#1E3A8A',
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 1.4,
//   },
// });
