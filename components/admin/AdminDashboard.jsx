import AutoGraphOutlined from "@mui/icons-material/AutoGraphOutlined";
import AllInboxOutlined from "@mui/icons-material/AllInboxOutlined";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import Inventory2Outlined from "@mui/icons-material/Inventory2Outlined";

const statCards = [
  {
    key: "revenue",
    label: "Revenue this month",
    icon: AutoGraphOutlined,
  },
  {
    key: "ordersToday",
    label: "Orders today",
    icon: AllInboxOutlined,
  },
  {
    key: "aiConversations",
    label: "AI conversations",
    icon: BoltOutlined,
  },
  {
    key: "lowStockCount",
    label: "Low-stock products",
    icon: Inventory2Outlined,
  },
];

export default function AdminDashboard({ snapshot }) {
  return (
    <main className="min-h-screen pb-16">
      <section className="section-shell py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">
            Operations Dashboard
          </p>
          <h1 className="mt-3 font-display text-5xl">Admin and automation center</h1>
          <p className="mt-4 text-lg leading-8 text-white/70">
            This is the management side of Toxic Man. It is set up to track
            catalog health, AI assistant activity, and free automation choices
            that can scale into real workflows.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.key} className="glass-panel rounded-[2rem] p-5">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-bronze/10 text-bronze">
                    <Icon />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                    live
                  </span>
                </div>
                <p className="mt-6 font-display text-4xl">{snapshot[card.key]}</p>
                <p className="mt-2 text-sm text-white/60">{card.label}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">
              Free Automation Options
            </p>
            <h2 className="mt-3 font-display text-3xl">What we can automate for free</h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/70">
              {snapshot.automationProviders.map((provider) => (
                <div key={provider} className="rounded-2xl border border-white/10 p-4">
                  {provider}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">
              Campaign Queue
            </p>
            <div className="mt-5 space-y-4">
              {snapshot.campaigns.map((campaign) => (
                <article key={campaign.name} className="rounded-2xl border border-white/10 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl">{campaign.name}</h3>
                    <span className="rounded-full bg-white/8 px-3 py-2 text-xs uppercase tracking-[0.2em] text-bronze">
                      {campaign.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/65">{campaign.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
