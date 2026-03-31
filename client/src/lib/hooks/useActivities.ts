import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import { useLocation } from 'react-router';

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const location = useLocation();

    const { data: activities, isPending, isError, error, refetch } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
        enabled: !id && location.pathname === '/activities'
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id
    });

    const createActivity = useMutation({
        mutationKey: ['activities', 'create'],
        mutationFn: async (activity: Activity) => {
            const response = await agent.post('/activities', activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    const updateActivity = useMutation({
        mutationKey: ['activities', 'update'],
        mutationFn: async (activity: Activity) => {
            const response = await agent.put('/activities', activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });


    const deleteActivity = useMutation({
        mutationKey: ['activities', 'delete'],
        mutationFn: async (id: string) => {
            const response = await agent.delete(`/activities/${id}`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });



    return {
        activities,
        isPending,
        isError,
        error,
        refetch,
        createActivity,
        updateActivity,
        deleteActivity,
        activity,
        isLoadingActivity
    };
};
