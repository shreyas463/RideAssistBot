import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dialog, Portal, RadioButton, TextInput, Button, Paragraph, useTheme } from 'react-native-paper';
import { IssueType } from '../models/Issue';

/**
 * Component for the report issue dialog
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the dialog is visible
 * @param {Function} props.onDismiss - Function to call when dialog is dismissed
 * @param {Function} props.onSubmit - Function to call when issue is submitted
 * @returns {JSX.Element} The rendered component
 */
export default function ReportIssueDialog({ visible, onDismiss, onSubmit }) {
  const [issueType, setIssueType] = useState(IssueType.PAYMENT);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  
  const handleSubmit = () => {
    // Validate input
    if (!description.trim()) {
      setError('Please describe your issue');
      return;
    }
    
    // Submit issue
    onSubmit(issueType, description.trim());
    
    // Reset form
    setIssueType(IssueType.PAYMENT);
    setDescription('');
    setError('');
  };
  
  const handleDismiss = () => {
    // Reset form
    setIssueType(IssueType.PAYMENT);
    setDescription('');
    setError('');
    onDismiss();
  };
  
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
        <Dialog.Title>Report Issue</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.sectionTitle}>Issue Type</Paragraph>
          <RadioButton.Group onValueChange={value => setIssueType(parseInt(value))} value={issueType.toString()}>
            <View style={styles.radioOption}>
              <RadioButton value={IssueType.PAYMENT.toString()} />
              <Paragraph onPress={() => setIssueType(IssueType.PAYMENT)}>Payment Issue</Paragraph>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value={IssueType.DRIVER_BEHAVIOR.toString()} />
              <Paragraph onPress={() => setIssueType(IssueType.DRIVER_BEHAVIOR)}>Driver Behavior</Paragraph>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value={IssueType.APP_PROBLEM.toString()} />
              <Paragraph onPress={() => setIssueType(IssueType.APP_PROBLEM)}>App Problem</Paragraph>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value={IssueType.OTHER.toString()} />
              <Paragraph onPress={() => setIssueType(IssueType.OTHER)}>Other</Paragraph>
            </View>
          </RadioButton.Group>
          
          <TextInput
            label="Describe your issue"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={5}
            mode="outlined"
            style={styles.textInput}
            error={!!error}
          />
          {error ? <Paragraph style={{ color: theme.colors.error }}>{error}</Paragraph> : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button onPress={handleSubmit}>Submit</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  textInput: {
    marginTop: 16
  }
}); 