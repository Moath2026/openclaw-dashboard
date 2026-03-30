import { useState, useEffect } from "react";

const AGENTS = [
  { id: 1, emoji: "🤖", name: "Blitz_01", status: "active", task: "Processing emails" },
  { id: 2, emoji: "🧠", name: "LogicCore", status: "active", task: "Analyzing data" },
  { id: 3, emoji: "🛡️", name: "Sentry_V9", status: "idle", task: "Standby" },
  { id: 4, emoji: "🌐", name: "Orbit_7", status: "active", task: "Web scraping" },
  { id: 5, emoji: "💡", name: "Cortex", status: "sleeping", task: "Low power" },
  { id: 6, emoji: "☁️", name: "Nimbus", status: "error", task: "Connection lost" },
];
const ACTIVITY = [
  { icon: "✅", text: "Blitz_01 completed email batch", time: "2m ago" },
  { icon: "📊", text: "LogicCore finished data analysis", time: "14m ago" },
  { icon: "🌐", text: "Orbit_7 scraped 142 pages", time: "31m ago" },
  { icon: "⚠️", text: "Nimbus lost connection", time: "1h ago" },
  { icon: "💤", text: "Cortex entered low-power mode", time: "2h ago" },
  { icon: "🔄", text: "System health check passed", time: "3h ago" },
];
const STATUS_COLORS = { active: "#22c55e", idle: "#eab308", sleeping: "#6b7280", error: "#ef4444" };
const NAV_ITEMS = [
  { icon: "🏠", label: "Overview" },
  { icon: "🤖", label: "Agents", badge: 5 },
  { icon: "📋", label: "Tasks" },
  { icon: "💰", label: "Costs" },
  { icon: "⚙️", label: "Settings" },
];
function getUTC3Time() {
  return new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Riyadh", hour: "2-digit", minute: "2-digit", second: "2-digit" });
}
export default function App() {
  const [dark, setDark] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [time, setTime] = useState(getUTC3Time());
  const [refreshing, setRefreshing] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  useEffect(() => { const t = setInterval(() => setTime(getUTC3Time()), 1000); return () => clearInterval(t); }, []);
  const handleRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 800); };
  const c = {
    bg: dark ? "#121212" : "#F5F5F5", sidebar: dark ? "#2D2D2D" : "#ffffff",
    card: dark ? "#1E1E1E" : "#ffffff", text: dark ? "#ffffff" : "#111111",
    subtext: dark ? "#9ca3af" : "#6b7280", border: dark ? "#333333" : "#e5e7eb", accent: "#FF6B35",
  };
  return (
    <div style={{ display:"flex", height:"100vh", background:c.bg, color:c.text, fontFamily:"'Inter',sans-serif", transition:"all 0.3s ease", overflow:"hidden" }}>
      <div style={{ width:collapsed?64:220, background:c.sidebar, borderRight:`1px solid ${c.border}`, display:"flex", flexDirection:"column", padding:"20px 0", transition:"width 0.3s ease", flexShrink:0 }}>
        <div style={{ padding:"0 16px 20px", borderBottom:`1px solid ${c.border}` }}>
          {!collapsed && <div style={{ fontSize:18, fontWeight:700, color:c.accent }}>OpenClaw 🚀</div>}
          <button onClick={() => setCollapsed(!collapsed)} style={{ marginTop:collapsed?0:12, background:"none", border:"none", cursor:"pointer", color:c.subtext, fontSize:18, padding:4 }}>{collapsed?"→":"←"}</button>
        </div>
        <nav style={{ flex:1, padding:"16px 8px" }}>
          {NAV_ITEMS.map((item,i) => (
            <div key={i} onClick={() => setActiveNav(i)} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 8px", borderRadius:8, cursor:"pointer", marginBottom:4, background:activeNav===i?`${c.accent}22`:"transparent", color:activeNav===i?c.accent:c.text, transition:"all 0.2s" }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
              {!collapsed && <span style={{ fontSize:14, fontWeight:500, flex:1 }}>{item.label}</span>}
              {!collapsed && item.badge && <span style={{ background:c.accent, color:"#fff", borderRadius:99, fontSize:11, padding:"1px 7px", fontWeight:700 }}>{item.badge}</span>}
            </div>
          ))}
        </nav>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", height:60, background:c.sidebar, borderBottom:`1px solid ${c.border}`, flexShrink:0 }}>
          <div style={{ fontWeight:700, fontSize:16 }}>Mission Control</div>
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <span style={{ fontSize:13, color:c.subtext }}>{time} UTC+3</span>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e" }} />
              <span style={{ fontSize:13, fontWeight:600, color:"#22c55e" }}>ONLINE</span>
            </div>
            <button onClick={() => setDark(!dark)} style={{ background:dark?"#333":"#eee", border:"none", borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:16 }}>{dark?"☀️":"🌙"}</button>
          </div>
        </div>
        <div style={{ flex:1, overflow:"auto", padding:24 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <h2 style={{ margin:0, fontSize:18, fontWeight:700 }}>Overview</h2>
            <button onClick={handleRefresh} style={{ background:c.accent, color:"#fff", border:"none", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontWeight:600, fontSize:13, transform:refreshing?"rotate(180deg)":"none", transition:"transform 0.5s ease" }}>🔄 Refresh</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
            {[
              { title:"Gateway Status", value:"Online", sub:"99.9% uptime", icon:"🟢", color:"#22c55e" },
              { title:"Active Agents", value:"5", sub:"3 working · 2 idle", icon:"🤖", color:c.text },
              { title:"Today's Cost", value:"$4.41", sub:"85% saved vs direct", icon:"💰", color:c.accent },
              { title:"Active Sessions", value:"12", sub:"8 API · 4 browser", icon:"🔗", color:c.text },
            ].map((card,i) => (
              <div key={i} style={{ background:c.card, borderRadius:12, padding:20, boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.08)", border:`1px solid ${c.border}`, transition:"transform 0.2s", cursor:"default" }}
                onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                <div style={{ fontSize:22, marginBottom:8 }}>{card.icon}</div>
                <div style={{ fontSize:13, color:c.subtext, marginBottom:4 }}>{card.title}</div>
                <div style={{ fontSize:26, fontWeight:700, color:card.color }}>{card.value}</div>
                <div style={{ fontSize:12, color:c.subtext, marginTop:4 }}>{card.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            <div style={{ background:c.card, borderRadius:12, padding:20, boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.08)", border:`1px solid ${c.border}` }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>🤖 Agent Fleet</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {AGENTS.map(agent => (
                  <div key={agent.id} style={{ background:dark?"#2D2D2D":"#F5F5F5", borderRadius:10, padding:12, border:`1px solid ${c.border}`, transition:"transform 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:18 }}>{agent.emoji}</span>
                      <div style={{ width:8, height:8, borderRadius:"50%", background:STATUS_COLORS[agent.status] }} />
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{agent.name}</div>
                    <div style={{ fontSize:11, color:c.subtext }}>{agent.task}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:c.card, borderRadius:12, padding:20, boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.08)", border:`1px solid ${c.border}` }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>📡 Mission Log</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {ACTIVITY.map((item,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, paddingBottom:12, borderBottom:i<ACTIVITY.length-1?`1px solid ${c.border}`:"none" }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:500 }}>{item.text}</div>
                      <div style={{ fontSize:11, color:c.subtext, marginTop:2 }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:c.card, borderRadius:12, padding:20, boxShadow:dark?"0 2px 8px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.08)", border:`1px solid ${c.border}` }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>⚡ System Resources</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[{ label:"CPU", value:42, color:"#22c55e" },{ label:"RAM", value:68, color:"#eab308" },{ label:"Disk", value:12, color:"#3b82f6" }].map(res => (
                <div key={res.label}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:13 }}>
                    <span style={{ fontWeight:600 }}>{res.label}</span>
                    <span style={{ color:c.subtext }}>{res.value}%</span>
                  </div>
                  <div style={{ background:dark?"#333":"#e5e7eb", borderRadius:99, height:8, overflow:"hidden" }}>
                    <div style={{ width:`${res.value}%`, height:"100%", background:res.color, borderRadius:99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
