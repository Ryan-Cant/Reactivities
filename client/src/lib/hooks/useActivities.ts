import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';

export const useActivities = () => {
    const queryClient = useQueryClient();
    const { data: activities, isPending, isError, error, refetch } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
    });

    const createActivity = useMutation({
        mutationKey: ['activities', 'create'],
        mutationFn: async (activity: Activity) => {
            await agent.post<string>('/activities', activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });

    const updateActivity = useMutation({
        mutationKey: ['activities', 'update'],
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['activities'] });
        },
    });


    const deleteActivity = useMutation({
        mutationKey: ['activities', 'delete'],
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
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
        deleteActivity
    };
};
