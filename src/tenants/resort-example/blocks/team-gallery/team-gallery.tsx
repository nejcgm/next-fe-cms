interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

interface TeamGalleryProps {
  title?: string;
  subtitle?: string;
  members: TeamMember[];
}

export function TeamGallery({
  title = "Meet Our Team",
  subtitle,
  members = [],
}: TeamGalleryProps) {
  return (
    <section className="py-16 px-4 bg-[var(--color-muted)]">
      <div className="max-w-6xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[var(--color-muted-foreground)] text-lg">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <div key={`${member.name}-${i}`} className="text-center">
              {member.image ? (
                <div className="aspect-square rounded-[var(--radius)] overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-[var(--radius)] bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[var(--color-primary)]">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              )}
              <h3 className="font-semibold text-[var(--color-text-primary)]">{member.name}</h3>
              <p className="text-sm text-[var(--color-primary)] mb-2">{member.role}</p>
              {member.bio && (
                <p className="text-sm text-[var(--color-muted-foreground)]">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
