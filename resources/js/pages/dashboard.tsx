import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Users, Inbox, Layers, TrendingUp, Box, Tag, ShoppingCart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { StatsCard } from '@/components/dashboard/stats-card';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { CategoryChart } from '@/components/dashboard/category-chart';
import { RecentOrders } from '@/components/dashboard/recent-orders';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

type Props = {
    pendingInvitations?: DashboardInvitation[];
    membersCount: number;
    teamsCount: number;
    pendingInvitationsCount: number;
    productsCount: number;
    categoriesCount: number;
    ordersCount: number;
    teamName: string;
};

export default function Dashboard({
    pendingInvitations = [],
    membersCount,
    teamsCount,
    pendingInvitationsCount,
    productsCount,
    categoriesCount,
    ordersCount,
    teamName,
}: Props) {
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitationsCount > 0,
    );
    const { currentTeam } = usePage().props as {
        currentTeam?: { name: string; roleLabel?: string } | null;
    };

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitationsCount > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Team dashboard
                        </p>
                        <h1 className="text-3xl font-semibold text-foreground">
                            {teamName || currentTeam?.name || 'Dashboard'}
                        </h1>
                    </div>
                    {pendingInvitationsCount > 0 ? (
                        <Button onClick={() => setShowInvitations(true)}>
                            Review invitations
                        </Button>
                    ) : null}
                </div>

                <Alert className="rounded-xl border border-sidebar-border/70 bg-white p-5 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <AlertTitle>Dashboard summary</AlertTitle>
                    <AlertDescription>
                        {pendingInvitationsCount > 0 ? (
                            <>
                                You have <strong>{pendingInvitationsCount}</strong> pending team invitation{pendingInvitationsCount > 1 ? 's' : ''}. You can review them directly here.
                            </>
                        ) : (
                            'No pending invitations at the moment. Your team is ready for the next milestone.'
                        )}
                    </AlertDescription>
                </Alert>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Team members"
                        value={membersCount.toString()}
                        change="Active in current team"
                        changeType="up"
                        icon={Users}
                    />
                    <StatsCard
                        title="Pending invitations"
                        value={pendingInvitationsCount.toString()}
                        change="Awaiting your response"
                        changeType={pendingInvitationsCount > 0 ? 'up' : 'down'}
                        icon={Inbox}
                    />
                    <StatsCard
                        title="Teams"
                        value={teamsCount.toString()}
                        change="Teams you belong to"
                        changeType="up"
                        icon={Layers}
                    />
                    <StatsCard
                        title="Your role"
                        value={currentTeam?.roleLabel ?? 'Member'}
                        change="Current team role"
                        changeType="up"
                        icon={TrendingUp}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <StatsCard
                        title="Store products"
                        value={productsCount.toString()}
                        change="Available in catalog"
                        changeType="up"
                        icon={Box}
                    />
                    <StatsCard
                        title="Categories"
                        value={categoriesCount.toString()}
                        change="Organized inventory"
                        changeType="up"
                        icon={Tag}
                    />
                    <StatsCard
                        title="Orders"
                        value={ordersCount.toString()}
                        change="Completed sales"
                        changeType="up"
                        icon={ShoppingCart}
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <SalesChart />
                    <CategoryChart />
                </div>

                <RecentOrders />
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
