import Button from '@/components/Button';
import CText from '@/components/Typography';
import { TASK_STATUS } from '@/constants';
import { useChangeTaskStatus } from '@/queries/useChangeTaskStatus';
import { useCreateTask } from '@/queries/useCreateTask';
import { useDeleteTask } from '@/queries/useDeleteTask';
import { useGetTasks } from '@/queries/useGetTasks';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

const CompletedScreen = () => {
  const { data, isLoading, error, refetch, isRefetching } = useGetTasks();
  const { mutate: changeStatus, isPending: isChangingStatus } = useChangeTaskStatus();
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();
  const { mutate: createTask, isPending: isCreatingTask } = useCreateTask();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);

  const completedTasks = useMemo(() => {
    return data?.filter((task) => task.status === 'COMPLETED') ?? [];
  }, [data]);

  const handleStatusChange = (taskId: string, newStatus: TASK_STATUS) => {
    changeStatus({ taskId, status: newStatus });
    setShowStatusDropdown(null);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
  };

  const getStatusOptions = (currentStatus: string): TASK_STATUS[] => {
    const allStatuses: TASK_STATUS[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    return allStatuses.filter((status) => status !== currentStatus);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setTitle('');
    setDescription('');
    setDueDate(null);
    setShowDatePicker(false);
  };

  const handleCreateTask = () => {
    if (!title.trim() || !description.trim() || !dueDate) {
      return;
    }

    const utcDate = new Date(
      Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate(), 0, 0, 0, 0)
    );

    createTask(
      {
        title: title.trim(),
        description: description.trim(),
        dueDate: utcDate,
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      }
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select a date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View className="p-4 mb-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <CText variant="Bold" className="mb-2 text-lg text-text-primary">
        {item.title}
      </CText>
      <CText variant="Regular" className="mb-4 text-sm text-text-secondary">
        {item.description}
      </CText>
      <View className="flex-row gap-2">
        <Button
          title="Change Status"
          variant="primary"
          size="sm"
          onPress={() => setShowStatusDropdown(item.id)}
          disabled={isChangingStatus || isDeletingTask}
          className="flex-1"
        />
        <Button
          title="Delete"
          variant="outline"
          size="sm"
          onPress={() => handleDeleteTask(item.id)}
          disabled={isChangingStatus || isDeletingTask}
          className="flex-1"
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-background-primary">
        <ActivityIndicator size="large" color="#0A66C2" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        data={completedTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 }}
        refreshing={isRefetching}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <CText variant="Bold" className="mb-4 text-2xl text-text-primary">
            Completed Tasks
          </CText>
        }
        ListEmptyComponent={
          <View className="py-8">
            <CText variant="Regular" className="text-center text-text-secondary">
              No completed tasks
            </CText>
          </View>
        }
      />

      {/* Floating Action Button */}
      <Pressable
        onPress={handleOpenModal}
        className="absolute right-6 bottom-6 justify-center items-center w-16 h-16 rounded-full shadow-lg bg-primary-500 active:bg-primary-600"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}>
        <CText variant="Bold" className="text-3xl text-white">
          +
        </CText>
      </Pressable>

      {/* Add Task Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="max-h-[90%] rounded-t-3xl bg-white p-6">
            <View className="flex-row justify-between items-center mb-6">
              <CText variant="Bold" className="text-2xl text-text-primary">
                Add New Task
              </CText>
              <Pressable onPress={handleCloseModal}>
                <CText variant="Bold" className="text-xl text-text-secondary">
                  ✕
                </CText>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <CText variant="Bold" className="mb-2 text-sm text-text-primary">
                  Title *
                </CText>
                <TextInput
                  className="px-4 py-3 text-base rounded-xl border border-gray-300"
                  placeholder="Enter task title"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-4">
                <CText variant="Bold" className="mb-2 text-sm text-text-primary">
                  Description *
                </CText>
                <TextInput
                  className="px-4 py-3 text-base rounded-xl border border-gray-300"
                  placeholder="Enter task description"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-6">
                <CText variant="Bold" className="mb-2 text-sm text-text-primary">
                  Due Date *
                </CText>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="px-4 py-3 bg-white rounded-xl border border-gray-300">
                  <CText
                    variant="Regular"
                    className={`text-base ${!dueDate ? 'text-gray-400' : 'text-text-primary'}`}>
                    {formatDate(dueDate)}
                  </CText>
                </Pressable>
                {showDatePicker && (
                  <View>
                    <DateTimePicker
                      value={dueDate || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleDateChange}
                      minimumDate={new Date()}
                    />
                    {Platform.OS === 'ios' && (
                      <Button
                        title="Done"
                        variant="primary"
                        size="sm"
                        onPress={() => setShowDatePicker(false)}
                        className="mt-2"
                      />
                    )}
                  </View>
                )}
              </View>

              <View className="flex-row gap-3">
                <Button
                  title="Cancel"
                  variant="outline"
                  size="lg"
                  onPress={handleCloseModal}
                  className="flex-1"
                  disabled={isCreatingTask}
                />
                <Button
                  title="Create Task"
                  variant="primary"
                  size="lg"
                  onPress={handleCreateTask}
                  className="flex-1"
                  isLoading={isCreatingTask}
                  disabled={!title.trim() || !description.trim() || !dueDate}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Status Change Modal */}
      <Modal
        visible={showStatusDropdown !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowStatusDropdown(null)}>
        <Pressable
          className="flex-1 justify-center items-center bg-black/50"
          onPress={() => setShowStatusDropdown(null)}>
          <Pressable className="m-8 w-72 bg-white rounded-xl" onPress={(e) => e.stopPropagation()}>
            <View className="p-4 border-b border-gray-200">
              <CText variant="Bold" className="text-lg text-text-primary">
                Change Status
              </CText>
            </View>
            {showStatusDropdown &&
              getStatusOptions(
                completedTasks.find((task) => task.id === showStatusDropdown)?.status || ''
              ).map((status) => (
                <Pressable
                  key={status}
                  onPress={() => handleStatusChange(showStatusDropdown, status)}
                  className="px-4 py-4 border-b border-gray-100 active:bg-gray-100">
                  <CText variant="Regular" className="text-base text-text-primary">
                    {status.replace('_', ' ')}
                  </CText>
                </Pressable>
              ))}
            <Pressable
              onPress={() => setShowStatusDropdown(null)}
              className="px-4 py-3 active:bg-gray-100">
              <CText variant="Bold" className="text-center text-gray-500">
                Cancel
              </CText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default CompletedScreen;
