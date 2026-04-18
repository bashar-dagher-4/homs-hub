// components/shared/Skeletons.tsx
// ملف واحد يحتوي كل Skeleton المشروع

export function NewsCardSkeleton() {
    return (
        <div
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
            }}
        >
            {/* الصورة */}
            <div
                className="h-48 w-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
            {/* المحتوى */}
            <div className="p-5 flex flex-col gap-3">
                {/* التاريخ */}
                <div
                    className="h-3 w-24 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                {/* العنوان */}
                <div
                    className="h-4 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-4 w-3/4 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                {/* الوصف */}
                <div
                    className="h-3 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-2/3 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                {/* الرابط */}
                <div
                    className="h-3 w-20 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
            </div>
        </div>
    )
}

export function EventCardSkeleton() {
    return (
        <div
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
            }}
        >
            {/* الصورة مع تاريخ */}
            <div
                className="h-48 w-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
            {/* المحتوى */}
            <div className="p-5 flex flex-col gap-3">
                <div
                    className="h-4 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-4 w-3/4 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-20 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
            </div>
        </div>
    )
}

export function ServiceCardSkeleton() {
    return (
        <div
            className="rounded-2xl p-6 animate-pulse flex flex-col gap-4"
            style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
            }}
        >
            {/* Badge القطاع */}
            <div
                className="h-6 w-16 rounded-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
            {/* العنوان */}
            <div
                className="h-5 w-3/4 rounded-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
            {/* الوصف */}
            <div className="flex flex-col gap-2">
                <div
                    className="h-3 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-5/6 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-4/6 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
            </div>
            {/* الرابط */}
            <div
                className="h-3 w-20 rounded-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
        </div>
    )
}

export function FacilityCardSkeleton() {
    return (
        <div
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
            }}
        >
            {/* الصورة */}
            <div
                className="h-48 w-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
            {/* المحتوى */}
            <div className="p-5 flex flex-col gap-3">
                <div
                    className="h-4 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-3/4 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                {/* الموقع */}
                <div className="flex items-center gap-2">
                    <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: "var(--muted)" }}
                    />
                    <div
                        className="h-3 w-32 rounded-full"
                        style={{ backgroundColor: "var(--muted)" }}
                    />
                </div>
            </div>
        </div>
    )
}

export function HistoryCardSkeleton() {
    return (
        <div
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
            }}
        >
            <div
                className="h-48 w-full"
                style={{ backgroundColor: "var(--muted)" }}
            />
            <div className="p-5 flex flex-col gap-3">
                <div
                    className="h-4 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-full rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
                <div
                    className="h-3 w-5/6 rounded-full"
                    style={{ backgroundColor: "var(--muted)" }}
                />
            </div>
        </div>
    )
}

export function MediaCardSkeleton() {
    return (
        <div
            className="rounded-2xl animate-pulse"
            style={{
                height: "192px",
                backgroundColor: "var(--muted)",
            }}
        />
    )
}

export function TableRowSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
                <div
                    key={i}
                    className="h-12 rounded-xl animate-pulse"
                    style={{ backgroundColor: "var(--muted)" }}
                />
            ))}
        </div>
    )
}

// مكون Grid يستخدم أي Skeleton
export function SkeletonGrid({
    count = 3,
    children,
}: {
    count?: number
    children: React.ReactNode
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i}>{children}</div>
            ))}
        </div>
    )
}