import { auth } from "@/auth";

export default async function SessionInfo() {
    const session = await auth();
   

    if (!session?.user) {
        return <div className="p-4 bg-red-100 text-red-700 rounded-md">未登录</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">会话信息</h2>
            <div className="space-y-3">
                <InfoItem label="用户ID" value={session.user.id} />
                <InfoItem label="用户名" value={session.user?.name || '未知'} />
                <InfoItem label="邮箱" value={session.user?.email || '未知'} />
                <InfoItem 
                    label="会话过期时间" 
                    value={session.expires ? new Date(session.expires).toLocaleString() : '未知'} 
                />
            </div>
        </div>
    );
}

function InfoItem({ label, value }: { label: string; value: string | undefined }) {
    return (
        <p className="flex justify-between">
            <span className="font-semibold text-gray-600">{label}:</span>
            <span className="text-gray-800">{value}</span>
        </p>
    );
}
